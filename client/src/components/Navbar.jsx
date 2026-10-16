import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/Logo.png'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Moon, ShoppingCart, Sun } from 'lucide-react'

const Navbar = ({ theme, onToggleTheme }) => {
  const {user, logout} = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-zinc-950/90 shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row md:gap-6 lg:px-10">
        {/* Brand Logo & Name */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 text-[26px] font-bold tracking-[-1px] text-white after:text-[36px] after:text-orange-500 after:content-['.']">
            <div>
              <img src={logo} alt="ShopNest" className='h-9 w-9 rounded-lg object-cover drop-shadow-[0_2px_8px_rgba(249,115,22,0.35)]' />
            </div>
            <span>ShopNest</span>
          </Link>
        </div>

        {/* Center Links */}
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-3 md:w-auto md:gap-x-7">
            <li>
            <NavLink to="/" className={({ isActive }) =>
            `relative text-[15px] text-lg font-medium transition-colors duration-300 after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full ${
              isActive ? 'text-white after:w-full' : 'text-zinc-400 after:w-0'
            }`
          }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) =>
            `relative text-[15px] text-lg font-medium transition-colors duration-300 after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full ${
              isActive ? 'text-white after:w-full' : 'text-zinc-400 after:w-0'
            }`
          }>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) =>
      `relative flex text-lg items-center gap-1.5 text-[15px] font-medium transition-colors duration-300 after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full ${
        isActive ? 'text-white after:w-full' : 'text-zinc-400 after:w-0'
      }`
    }>
              <span><ShoppingCart className="w-6 h-6 text-pink-600" /></span>({cartItems ? cartItems.length : 0})
            </NavLink>
          </li>
          {user ? (
            <>
            <li><NavLink to="/profile" className={({ isActive }) =>
                `relative text-[15px] text-lg font-medium transition-colors duration-300 after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full ${
                  isActive ? 'text-white after:w-full' : 'text-zinc-400 after:w-0'
                }`
              }>Hi, {user.name}</NavLink></li>
            {user.role === "admin" && (<li><NavLink to="/admin" className={({ isActive }) =>
                  `relative text-[15px] text-lg font-medium transition-colors duration-300 after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full ${
                    isActive ? 'text-white after:w-full' : 'text-zinc-400 after:w-0'
                  }`
                }>Admin</NavLink></li>)}
            <li><button onClick={handleLogout} className="cursor-pointer rounded-md border border-red-500/30 bg-transparent px-4 py-2 text-lg text-sm font-semibold text-red-500 transition-all duration-300 hover:-translate-y-[1px] hover:border-red-500 hover:bg-red-500/10">Logout</button></li>
            </>
          ) : (
          <li><NavLink to="/login" className={({ isActive }) =>
              `relative text-[15px] text-lg font-medium transition-colors duration-300 after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full ${
                isActive ? 'text-white after:w-full' : 'text-zinc-400 after:w-0'
              }`
            }>Login</NavLink></li>
          )}
          <li>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
              title={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-300 transition-colors hover:border-orange-500/60 hover:bg-orange-500/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar