import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import NavList from './NavList';
import { BsCart3 } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import customAPI from '../api';
import { logoutUser } from '../feature/userSlice';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const user = useSelector((state) => state.userState.user); // Assuming userState contains user info
  const countInCart = useSelector((state) => state.cartState.numItemsInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlingLogout = async () => {
    try {
      await customAPI.get('/auth/logout');
      dispatch(logoutUser());
      navigate('/');
      console.log("Logout Berhasil");
    } catch (error) {
      dispatch(logoutUser());
      navigate('/');
    }
  };

  return (
    <nav className='bg-base-300'>
      <div className='navbar mx-auto max-w-6xl px-8'>
        <div className='navbar-start'>
          <NavLink to="/" className="hidden lg:flex items-center">
            <h4>EXCEL VIJAYA</h4>
          </NavLink>
          {/* KHUSUS mOBILE */}
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden '>
              <FaBarsStaggered className="h-6 w-6"/>
            </label>
            <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 '>
              <NavList />
            </ul>
          </div>

          {/* KHUSUS PC */}
          <div className='hidden lg:flex'>
            <ul className='menu menu-horizontal'>
              <NavList />
            </ul>
          </div>
        </div>
        <div className='navbar-end'>
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md">
            <div className='indicator'>
              <BsCart3 />
              <span className='badge badge-primary badge-sm indicator-item'>
                {countInCart}
              </span>
            </div>
          </NavLink>
          {user && (
            <button className='btn btn-error btn-outline btn-md ' onClick={handlingLogout}>Logout</button>
          )}
        </div>        
      </div>
    </nav>
  );
};

export default Nav;
