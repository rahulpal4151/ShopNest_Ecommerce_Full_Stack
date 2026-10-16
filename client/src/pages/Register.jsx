import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MailCheck } from 'lucide-react';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpExpiresAt, setOtpExpiresAt] = useState(0);
  const [resendAvailableAt, setResendAvailableAt] = useState(0);
  const [clockNow, setClockNow] = useState(Date.now());
  const [otpMessage, setOtpMessage] = useState('');
  const otpInputRefs = useRef([]);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOtpSent) return undefined;
    const timer = setInterval(() => setClockNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [isOtpSent]);

  const expiresIn = Math.max(0, Math.ceil((otpExpiresAt - clockNow) / 1000));
  const resendIn = Math.max(0, Math.ceil((resendAvailableAt - clockNow) / 1000));
  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();

      if (res.ok) {
        setOtp('');
        setOtpMessage('');
        const now = Date.now();
        setClockNow(now);
        setOtpExpiresAt(data.otpExpiresAt || now + 10 * 60 * 1000);
        setResendAvailableAt(now + (data.resendAfterSeconds || 30) * 1000);
        setIsOtpSent(true);
        setTimeout(() => otpInputRefs.current[0]?.focus(), 0);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setOtpMessage('Please enter the 6-digit code.');
      return;
    }

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        navigate('/');
      } else {
        setOtpMessage(data.message || 'Could not verify the code.');
        if (data.expired) setOtpExpiresAt(Date.now());
      }
    } catch (error) {
      console.error(error);
      setOtpMessage('Verification failed. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        const now = Date.now();
        setOtp('');
        setOtpMessage(data.message || 'A new code has been sent.');
        setClockNow(now);
        setOtpExpiresAt(data.otpExpiresAt || now + 10 * 60 * 1000);
        setResendAvailableAt(now + (data.resendAfterSeconds || 30) * 1000);
        otpInputRefs.current[0]?.focus();
      } else {
        setOtpMessage(data.message || 'Could not resend the code.');
        if (data.resendAfterSeconds) {
          setResendAvailableAt(Date.now() + data.resendAfterSeconds * 1000);
        }
      }
    } catch (error) {
      console.error(error);
      setOtpMessage('Could not resend the code. Please try again.');
    }
  };

  const handleOtpChange = (index, value) => {
    const digits = value.replace(/\D/g, '').slice(0, 6 - index);
    setOtp((current) => {
      const next = current.padEnd(6, ' ').split('');
      for (let offset = 0; offset < digits.length; offset += 1) {
        next[index + offset] = digits[offset];
      }
      if (!digits) next[index] = ' ';
      return next.join('').trimEnd();
    });
    if (digits && index < 5) otpInputRefs.current[Math.min(index + digits.length, 5)]?.focus();
    if (!digits && index > 0) otpInputRefs.current[index - 1]?.focus();
    setOtpMessage('');
  };

  const handleOtpPaste = (event) => {
    const pastedOtp = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedOtp) return;
    event.preventDefault();
    setOtp(pastedOtp);
    otpInputRefs.current[Math.min(pastedOtp.length, 5)]?.focus();
    setOtpMessage('');
  };

// Reusable classes
  const formCardClasses =
    "bg-[#18181b] p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] w-full max-w-[420px] flex flex-col gap-5 border border-white/5 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:-left-1/2 before:w-[200%] before:h-1 before:bg-gradient-to-r before:from-transparent before:via-orange-500 before:to-transparent before:animate-shimmer";

  const inputClasses =
    "p-[15px] bg-[#09090b] border border-[#27272a] rounded-lg text-[15px] text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 ease-in-out placeholder:text-zinc-600";

  const buttonClasses =
    "w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-all duration-300 cursor-pointer disabled:opacity-50";


  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      {!isOtpSent ? (
        <form onSubmit={handleRegisterSubmit} className={formCardClasses}>
          <h2 className="text-center text-[2rem] font-bold text-white mb-2.5">
            Create Your Account
          </h2>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            required
          />
          <button type="submit" className={buttonClasses}>
            Sign up
          </button>
          <p className="text-center mt-4 text-[#a1a1aa] text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 font-semibold hover:underline transition-all">
              Login
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className={formCardClasses}>
          <button
            type="button"
            onClick={() => setIsOtpSent(false)}
            className="self-start text-sm text-zinc-400 hover:text-white"
          >
            &larr; Back
          </button>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
              <MailCheck size={26} aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-white">Verify your email</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Enter the 6-digit code sent to<br />
              <strong className="text-white">{email}</strong>
            </p>
          </div>

          <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                ref={(element) => { otpInputRefs.current[index] = element; }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                aria-label={`Verification code digit ${index + 1}`}
                value={otp[index] || ''}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && !otp[index] && index > 0) {
                    otpInputRefs.current[index - 1]?.focus();
                  }
                  if (event.key === 'ArrowLeft' && index > 0) otpInputRefs.current[index - 1]?.focus();
                  if (event.key === 'ArrowRight' && index < 5) otpInputRefs.current[index + 1]?.focus();
                }}
                maxLength={1}
                className="h-14 w-11 rounded-lg border border-[#27272a] bg-[#09090b] text-center text-xl font-bold text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                required
              />
            ))}
          </div>

          <div className="flex justify-between text-xs text-zinc-400">
            <span>{expiresIn > 0 ? `Code expires in ${formatTime(expiresIn)}` : 'Code expired'}</span>
            <span>Resend in {formatTime(resendIn)}</span>
          </div>

          {otpMessage && <p role="status" className="text-center text-sm text-orange-300">{otpMessage}</p>}

          <button type="submit" className={buttonClasses} disabled={expiresIn === 0}>
            Verify email
          </button>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendIn > 0}
            className="self-center border-0 bg-transparent text-sm text-orange-500 hover:underline disabled:cursor-not-allowed disabled:text-zinc-600"
          >
            {resendIn > 0 ? `Resend code in ${formatTime(resendIn)}` : 'Resend code'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;