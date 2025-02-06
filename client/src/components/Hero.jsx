import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    
    <>
  
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Selamat datang di Excel Vijaya 
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
          Selamat datang di Toko Fotocopy Excel Vijaya, tempat terpercaya untuk layanan fotocopy berkualitas dan kebutuhan cetak Anda. Kami berkomitmen memberikan layanan terbaik dengan hasil cetak yang jelas dan rapi.

          </p>
          <div className='mt-10'>
            <Link to="/products" className='btn btn-primary'>Product Kami</Link>
          </div>
        </div>
        <div className="hidden lg:carousel carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
          <div className="carousel-item">
            <img
              src="https://lh5.googleusercontent.com/p/AF1QipPzSAlxiiRV_SgRdt4BgA0DgqLRezXUduzHTpxE=w426-h240-k-no"
              alt="Stock item"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1587502531236-1c9c0a7f9a15.webp"
              alt="Stock item 2"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1617956806934-477e34b2f0d4.webp"
              alt="Stock item 3"
              className="rounded-box"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
