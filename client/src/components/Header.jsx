import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Header = () => {
  const user = useSelector((state) => state.userState.user); // Assuming userState contains user info

  return (
    <header className='bg-base-200 py-2 text-white-content'>
      <div className='mx-auto max-w-6xl px-8 flex justify-center sm:justify-end'>
        {user ? (
          <div className='flex items-center gap-x-6'>
            <span className='text-xs sm:text-sm'>Hello, {user.name}</span>
            {/* Only display role if the user is an owner */}
            {user.role === 'owner' && (
              <span className='text-xs sm:text-sm'> (Role: {user.role})</span>,
           
              <Link to="/order" className='link link-hover text-xs sm:text-sm' >
             ({user.role}) : Dashboard
            </Link>
              
            )}
            
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center'>
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign In
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
