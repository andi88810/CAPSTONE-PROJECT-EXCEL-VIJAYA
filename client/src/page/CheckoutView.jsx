import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartTotal from '../components/CartTotal';
import FormInput from '../components/Form/FormInput';
import customAPI from "../api";
import { clearCartItem } from '../feature/cartSlice';

const insertSnapScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        const clientKey = import.meta.env.VITE_CLIENT_MIDTRANS;

        if (!clientKey) {
            console.error("MIDTRANS client key is not defined.");
            return;
        }

        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute("data-client-key", clientKey);
        script.onload = () => resolve();
        document.body.appendChild(script);
    });
};


export const loader = (storage) => () => {
    const user = storage.getState().userState.user;
    if (!user) {
        toast.warn("Login untuk mengakses halaman Checkout");
        return redirect("/login");
    }
    return null;
};

const CheckoutView = () => {
    const user = useSelector((state) => state.userState.user);
    const carts = useSelector((state) => state.cartState.CartItems);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        insertSnapScript();
    }, []);

    const handleCheckout = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formdata = new FormData(form);
        const data = Object.fromEntries(formdata);

        const newArrayKeranjang = carts.map((item) => ({
            product: item.productId,
            quantity: item.amount,
        }));

        try {
            const response = await customAPI.post("/order", {
                email: data.email,
                firstName: data.firstname,
                lastName: data.lastname,
                phone: data.phone,
                shippingAddress: {
                    addressLine1: data.addressLine1,
                    addressLine2: data.addressLine2,
                    city: data.city,
                    state: data.state,
                    postalCode: data.postalCode,
                    country: data.country,
                },
                cartItem: newArrayKeranjang,
                paymentMethod: data.paymentMethod,
            });

            if (data.paymentMethod === "manual") {
                toast.success("Order created with manual payment option. Check your email for payment instructions.");
                navigate("/order");
            } else {
                const snapToken = response.data.token;
                window.snap.pay(snapToken.token, {
                    onSuccess: async (result) => {
                        console.log(result);
                        dispatch(clearCartItem());
                        toast.success("Pembayaran berhasil");
                        navigate("/order");
                    },
                    onPending: (result) => {
                        console.log(result);
                        toast.info("Pembayaran sedang diproses");
                    },
                    onError: (result) => {
                        console.log(result);
                        toast.error("Pembayaran gagal");
                    },
                });
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Terjadi kesalahan";
            toast.error(errorMessage);
        }
    };

    return (
        <div className='container max-w-7xl mx-auto px-4 mt-2 mb-4'>
            <div className='border-b border-primary pb-5 mt-5'>
                <h2 className='text-2xl font-bold capitalize'>Checkout Product</h2>
            </div>
            <div className='mt-8 grid gap-4 lg:grid-cols-12'>
                <div className='lg:col-span-8'>
                    <form
                        className='bg-base-300 rounded-2xl grid gap-5 items-center p-5 '
                        onSubmit={handleCheckout}
                    >
                        <div className='grid grid-cols-2 gap-x-4'>
                            <FormInput label="Nama Depan" type="text" name="firstname" required />
                            <FormInput label="Nama Belakang" type="text" name="lastname" required />
                        </div>
                        <FormInput label="Email" type="email" name="email" defaultValue={user.email} required />
                        <FormInput label="NO HP" type="number" name="phone" required />

                        {/* Payment Method Selection */}
                        <label className='block'>
                            <span className='text-white'>Metode Pembayaran</span>
                            <select name="paymentMethod" required className='select select-accent w-full max-w-xss mt-1 block'>
                            <option value="automatic">Automatic Payment (Midtrans)</option>
                                <option value="manual">Manual Payment</option>
                               
                        
                            </select>
                        </label>

                        {/* Shipping Address Fields */}
                        <div className='grid grid-cols-2 gap-x-4'>
                            <FormInput label="Alamat Lengap 1" type="text" name="addressLine1" required />
                            <FormInput label="Alamat Lengap 2 (Optional)" type="text" name="addressLine2" />
                        </div>
                        <div className='grid grid-cols-2 gap-x-4'>
                            <FormInput label="Kota" type="text" name="city" required />
                            <FormInput label="Provinsi" type="text" name="state" required />
                        </div>
                        <div className='grid grid-cols-2 gap-x-4'>
                            <FormInput label="Kode Pos" type="text" name="postalCode" required />
                            <FormInput label="Negara" type="text" name="country" required />
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-primary rounded-lg py-3 text-white font-bold mt-4'
                        >
                            Order sekarang!
                        </button>
                    </form>
                </div>
                <div className='lg:col-span-4'>
                    <CartTotal carts={carts} />
                </div>
            </div>
        </div>
    );
};

export default CheckoutView;
