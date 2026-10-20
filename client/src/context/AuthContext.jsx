import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deactivateCart, getCartForUser, setCartForUser } from '../redux/cartSlice';

export const AuthContext = createContext();
/*
1. Context Create Karna
 - export const AuthContext = createContext();
 - Yeh ek global context create karta hai.
Iska use karke koi bhi child component (useContext(AuthContext) ke through) user state ya functions ko directly access kar sakta hai, bina props pass kiye (prop drilling avoid hoti hai).

*/

export const AuthProvider = ({ children }) => {

  const dispatch = useDispatch();
  const [user, setUser] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );
  /*
  2. State & LocalStorage Synchronization
  Yeh user state banata hai.
  Initial Value: Direct null dene ke bajaye yeh pehle localStorage check karta hai:
  Agar browser ke localStorage mein 'userInfo' key present hai, toh use JSON format mein parse karke initial state bana deta hai.
  Agar nahi hai, toh state null rehti hai.
  Fayda: Jab user page refresh karta hai, toh React state reset hone ke baad bhi localStorage se data wapas load ho jata hai aur user logout nahi hota.
  */


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    dispatch(setCartForUser({
      userId: userData?._id,
      cartItems: getCartForUser(userData?._id),
    }));
  };
/*
3. Login Functionality
const login = (userData) => { ... }
Jab user successfully login karta hai, toh yeh function call hota hai.
setUser(userData); — Current React state ko user details ke sath update karta hai taaki UI turant re-render ho.
localStorage.setItem('userInfo', JSON.stringify(userData)); — User object ko string mein convert karke browser ke local storage mein save karta hai.
*/

  const logout = () => {
    dispatch(deactivateCart());
    setUser(null);
    localStorage.removeItem('userInfo');
  };
  /*
  4. Logout Functionality

const logout = () => { ... }

setUser(null); — React state ko clear karta hai taaki protected screens ya login-only UI hat jayein.

localStorage.removeItem('userInfo'); — Local storage se token/data delete karta hai taaki refresh par wapas auto-login na ho.
*/

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
     /*
  Yeh wrapper context provide karta hai jisme teen cheezein share ki gayi hain:
user: Current user state (data ya null).
login: Login trigger karne wala function.
logout: Logout trigger karne wala function.

{children}
Jo bhi components <AuthProvider> ke andar wrap honge (jaise <App/> ya specific routes), wo sabhi is context ko easily use kar payenge.
*/
  );

 
};