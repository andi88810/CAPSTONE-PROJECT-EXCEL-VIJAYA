import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import customAPI from "../api";
import { FaPlus } from 'react-icons/fa';
import { generateSelectAmount, priceFormat } from '../utils';
import { useDispatch } from 'react-redux';
import { addItem } from '../feature/cartSlice';

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(1);
    
    const dispatch = useDispatch();

    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value));
    };

    const handleCart = () => {
        if (product) {
            const productCart = {
                cartId: product._id + product.name,
                productId: product._id,
                image: product.image,
                name: product.name,
                price: product.price,
                stock: product.stock,
                amount,
            };
            dispatch(addItem({ product: productCart }));
        } else {
            console.error("Product is not defined.");
        }
    };

    const productData = async () => {
        try {
            const { data } = await customAPI.get(`/product/${id}`);
            setTimeout(() => {
                setProduct(data.data);
                setLoading(false);
            }, 1200);
        } catch (error) {
            console.error('Error fetching product data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        productData();
    }, [id]);

    return (
        <section className="p-5 lg:p-10">
            {loading ? (
                <p className='font-bold text-xl text-center'>
                    <span className="loading loading-spinner loading-xs font-bold"></span>
                    Loading product details...
                </p>
            ) : product ? (
                <div className="flex flex-col lg:flex-row bg-base-300 shadow-lg rounded-lg">
                    <figure className="lg:w-1/2 p-5">
                        <img
                            className='w-full h-[400px] object-contain rounded-lg shadow-md'
                            src={product.image || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                            alt={product.name || "Product Image"}
                        />
                    </figure>
                    <div className="lg:w-1/2 p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-primary">{product.name || "Product Name"}</h2>
                            <div className="badge badge-accent">Kategory: {product.category}</div>
                        </div>
                        <span className='text-2xl mt-2 text-accent font-bold'>{priceFormat(product.price)}</span>
                        
                        {/* Stock information below price */}
                        <div className="mt-3">
                            <span className='font-bold text-lg'>
                                Stock: <span className={product.stock === 0 ? 'text-red-500' : 'text-green-500'}>{product.stock}</span>
                            </span>
                        </div>

                        <p className='mt-3 text-white'>Deskripsi : {product.description || "Product Description"}</p>
                        <div className="mt-5">
                            {product.stock === 0 ? (
                                <div className="text-red-500 font-bold">Stock Habis</div>
                            ) : (
                                <div className='flex flex-col gap-y-4'>
                                    <label className='form-control'>
                                        <span className='capitalize label-text'>Amount</span>
                                        <select name="amount" className="select select-bordered" onChange={handleAmount}>
                                            {generateSelectAmount(product.stock)}
                                        </select>
                                    </label>
                                    <button className="btn btn-primary btn-lg flex items-center gap-2" onClick={handleCart}>
                                        <FaPlus /> Keranjang
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-red-500 font-bold">Gagal Memuat Product</p>
            )}
            
        </section>
    );
};

export default DetailProduct;
