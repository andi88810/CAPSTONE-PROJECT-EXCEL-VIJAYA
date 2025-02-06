import React from "react";
import { Link } from "react-router-dom";
import { priceFormat } from "../utils";
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import customAPI from "../api";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

const CardProduct = ({ item, user }) => {
  const { revalidate } = useRevalidator();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: `Apakah anda yakin ingin menghapus ${item.name} dari product?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Tidak, simpan',
      background: '#2D3748', // Dark background color
      color: '#F7FAFC', // Text color
    });

    if (result.isConfirmed) {
      try {
        await customAPI.delete(`/product/${item._id}`);
        toast.info("Delete Product Berhasil");
        revalidate();
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };

  return (
    <div className="card bg-base-300 shadow-xl" key={item._id}>
      <figure>
        <img
          src={item.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
          alt={item.name || "Product"}
        />
      </figure>
     
      <div className="card-body">
        {/* Conditionally render the edit and delete icons if the user is an owner */}
        {user?.role === 'owner' && (
          <div className="flex justify-end gap-x-3">
            <FaTrash 
              className="text-red-500 cursor-pointer" 
              onClick={handleDelete} // Call the delete handler
            />
            <Link to={`/product/${item._id}/edit`}>
              <FaPencilAlt className="text-info cursor-pointer" />
            </Link>
          </div>
        )}

        <h2 className="card-title">{item.name || "Product Name"}</h2>
        <p className="font-bold text-accent">{priceFormat(item.price)}</p>
        <p>{item.description.substring(0, 50) || "Product description goes here."}</p>
        <div className="card-actions justify-left">
          <div className="badge badge-outline badge-info">{item.category}</div>
          <div
            className={`badge badge-outline ${
              item.stock === 0 || item.stock === 1 ? 'badge-error text-red-500' : 'badge-success'
            }`}
          >
            {item.stock === 0 ? 'Stock Habis' : `Stock: ${item.stock}`}
          </div>
        </div>

        <div className="card-actions justify-center mt-2">
          {item.stock === 0 ? (
            <button className="btn btn-disabled btn-outline text-white cursor-not-allowed">
              Out of Stock
            </button>
          ) : (
            <Link to={`/product/${item._id}`} className="btn btn-primary rounded-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              Beli Sekarang
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
