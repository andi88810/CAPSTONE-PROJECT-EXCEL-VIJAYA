import React from 'react';
import { generateSelectAmount, priceFormat } from '../utils';
import { FaTrash } from 'react-icons/fa6';
import { useDispatch } from "react-redux";
import { editItem, removeItem } from '../feature/cartSlice';
import Swal from 'sweetalert2'; // Import SweetAlert2

const CartListItems = ({ cartItem }) => {
  const { cartId, name, price, image, amount, stock } = cartItem;
  const dispatch = useDispatch();
  
  const handleAmount = (e) => {
      dispatch(editItem({ cartId, amount: parseInt(e.target.value) }));
  };

  const removeProductItem = () => {
    Swal.fire({
      title: `Are you sure you want to remove ${name} from the cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it',
      background: '#2D3748', // Dark background color
      color: '#F7FAFC', // Text color
     
 
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem({ cartId }));
        Swal.fire({
          title: 'Removed!',
          text: `${name} has been removed from your cart.`,
          icon: 'success',
          background: '#2D3748', // Dark background color
          color: '#F7FAFC', // Text color
        });
      }
    });
  };

  return (
    <article 
      key={cartId} 
      className='mb-4 p-6 bg-gray-800 rounded-lg shadow-md flex items-center justify-between relative'>
      
      {/* Trash Button - Positioned at the top right corner */}
      <button className='absolute top-2 right-3 text-gray-300 hover:text-red-500 p-1' onClick={removeProductItem}>
        <FaTrash className='h-4 w-4' /> {/* Slightly reduced size of the icon */}
      </button>

      {/* Product Image */}
      <img 
        src={image} 
        alt={name} 
        className='h-20 w-20 sm:h-24 sm:w-24 rounded-lg object-cover mr-4' />

      {/* Product Info Wrapper */}
      <div className='flex flex-col flex-1'>
        <h2 className='text-white font-semibold text-sm sm:text-lg'>{name}</h2> {/* Reduced font size */}
        <p className='text-white text-xs sm:text-base'>{priceFormat(price)}</p> {/* Reduced font size */}
        <p className='text-white text-xs sm:text-base'>Jumlah {amount} product </p>
        
      </div>

      {/* Quantity Selector */}
      <div className='flex items-center'>
        <div className='form-control max-w-xs'>
          <select 
            name="amount"  
            className="select select-bordered" 
            value={amount} 
            onChange={handleAmount}>
              {generateSelectAmount(stock)}
          </select>
        </div>
      </div>
    </article>
  );
};

export default CartListItems;
