const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendOtpEmail = require("../utils/sendOtpEmail");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const OTP_EXPIRY_MS = 10 * 60 * 1000;
const OTP_RESEND_COOLDOWN_MS = 30 * 1000;

const createOtp = () =>
  crypto.randomInt(0, 1000000).toString().padStart(6, "0");

const sendNewOtp = async (user) => {
  const otp = createOtp();
  const previousOtp = {
    hash: user.otpHash,
    expires: user.otpExpires,
    sentAt: user.otpLastSentAt,
  };
  user.otpHash = await bcrypt.hash(otp, 10);
  user.otpExpires = new Date(Date.now() + OTP_EXPIRY_MS);
  user.otpLastSentAt = new Date();
  await user.save();
  try {
    await sendOtpEmail(user, otp);
  } catch (error) {
    user.otpHash = previousOtp.hash;
    user.otpExpires = previousOtp.expires;
    user.otpLastSentAt = previousOtp.sentAt;
    await user.save();
    throw error;
  }
};

// ====================================================
// REGISTER USER
// ====================================================
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    if (!normalizedEmail || String(password).trim().length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Valid email and password of at least 6 characters are required",
      });
    }

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      if (userExists.isVerified) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }

      const remainingMs =
        OTP_RESEND_COOLDOWN_MS -
        (Date.now() - new Date(userExists.otpLastSentAt || 0).getTime());
      if (remainingMs <= 0) await sendNewOtp(userExists);
      return res.json({
        success: true,
        pendingVerification: true,
        resendAfterSeconds:
          remainingMs <= 0 ? 30 : Math.ceil(remainingMs / 1000),
        otpExpiresAt: userExists.otpExpires?.getTime(),
        message: "Continue with the email verification code.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: false,
    });

    if (user) {
      try {
        await sendNewOtp(user);
      } catch (emailError) {
        await User.deleteOne({ _id: user._id });
        throw emailError;
      }

      return res.status(201).json({
        success: true,
        otpExpiresAt: user.otpExpires.getTime(),
        resendAfterSeconds: 30,
        message: "Verification code sent to your email.",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const normalizedEmail = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const user = await User.findOne({
      email: normalizedEmail,
      isVerified: false,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No pending email verification was found.",
      });
    }

    const remainingMs =
      OTP_RESEND_COOLDOWN_MS -
      (Date.now() - new Date(user.otpLastSentAt || 0).getTime());
    if (remainingMs > 0) {
      return res.status(429).json({
        success: false,
        message: "Please wait before requesting another code.",
        resendAfterSeconds: Math.ceil(remainingMs / 1000),
      });
    }

    await sendNewOtp(user);
    return res.json({
      success: true,
      otpExpiresAt: user.otpExpires.getTime(),
      resendAfterSeconds: 30,
      message: "A new verification code has been sent.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const normalizedEmail = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const otp = String(req.body.otp || "").trim();
    const user = await User.findOne({
      email: normalizedEmail,
      isVerified: false,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Verification request not found." });
    }

    if (!/^\d{6}$/.test(otp) || !user.otpHash || !user.otpExpires) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code." });
    }

    if (user.otpExpires.getTime() < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Verification code expired. Request a new one.",
        expired: true,
      });
    }

    if (!(await bcrypt.compare(otp, user.otpHash))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code." });
    }

    user.isVerified = true;
    user.otpHash = undefined;
    user.otpExpires = undefined;
    user.otpLastSentAt = undefined;
    await user.save();

    return res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      message: "Email verified successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ====================================================
// LOGIN USER
// ====================================================
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================================
// GET All Users (Admin)
// ====================================================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
