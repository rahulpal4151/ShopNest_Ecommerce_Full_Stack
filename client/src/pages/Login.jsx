import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#18181b] p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] w-full max-w-[420px] flex flex-col gap-5 border border-white/5 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:-left-1/2 before:w-[200%] before:h-1 before:bg-gradient-to-r before:from-transparent before:via-orange-500 before:to-transparent before:animate-[shimmer_3s_infinite_linear]"
      >
        <h2 className="text-center text-[2rem] font-bold text-white mb-2.5">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-[15px] bg-[#09090b] border border-[#27272a] rounded-lg text-[15px] text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 ease-in-out placeholder:text-zinc-600"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-[15px] bg-[#09090b] border border-[#27272a] rounded-lg text-[15px] text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 ease-in-out placeholder:text-zinc-600"
          required
        />

        <button
          type="submit"
          className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-all duration-300 cursor-pointer disabled:opacity-50"
        >
         Login
        </button>

        <p className="text-center mt-4 text-[#a1a1aa] text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline transition-all"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;