import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const links = [
  { id: 1, url: 'products', text: "Produk" },
  { id: 2, url: 'order', text: "Order" },
  { id: 3, url: 'about', text: "Tentang Kami" },
  { id: 4, url: 'checkout', text: "checkout" },
];

const NavList = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        // Check if user is not logged in and the url is either 'orders' or 'checkout'
        if ((url === 'order' || url === 'checkout') && !user) {
          return null; // Skip rendering for 'orders' and 'checkout' if user is not logged in
        }

        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavList;
