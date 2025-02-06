import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import customAPI from '../api.js';
import Filter from "../components/Filter.jsx";
import CardProduct from "../components/CardProduct.jsx";
import Pagination from "../components/Pagination.jsx";
import { useSelector } from "react-redux";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  
  const { data } = await customAPI.get('/product', { params });

  const products = data.data;
  const pagination = data.pagination;

  return { products, params, pagination };
};

const ProductView = () => {
  const { products, pagination } = useLoaderData();
  const user = useSelector((state) => state.userState.user); // Get user from Redux

  return (
    <>
      <Filter />

      {/* Conditionally render "Tambah Items" button if user is owner */}
      {user?.role === 'owner' && (
        <div className="flex justify-end">
          <Link to="/product/create" className="btn btn-primary mt-2">
            Tambah Items
          </Link>
        </div>
      )}

      {/* Check if there are products to display */}
      {products.length > 0 ? (
        <>
          <h3 className="text-lg text-primary font-bold text-right my-3">
            Menampilkan {products.length} dari {pagination.totalProduct} produk
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            {products.map((item) => (
              <CardProduct item={item} key={item._id} user={user}/>
            ))}
          </div>

          {/* Conditionally render Pagination only if there are products */}
          <div className="mt-5 flex justify-center">
            <Pagination />
          </div>
        </>
      ) : (
        <div className="col-span-full text-center mt-10">
          <h2 className="font-semibold text-3xl">Produk yang anda cari tidak ada.</h2>
          <p className="text-gray-500">Silahkan Cari Lagi</p>
        </div>
      )}
    </>
  );
};

export default ProductView;
