import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4 mt-auto">
      <div className="text-center">
        <p>
          Hak Cipta © {new Date().getFullYear()} - Semua hak dilindungi oleh Control Ltd
        </p>
        {/* Optional social media links */}
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-blue-600">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-blue-400">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-pink-500">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
