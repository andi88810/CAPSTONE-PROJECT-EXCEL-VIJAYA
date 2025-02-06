import React from 'react';
import FormTextArea from '../components/Form/FormTextArea';
import FormSelect from '../components/Form/FormSelect';
import FormInput from '../components/Form/FormInput';
import customAPI from '../api';
import { toast } from "react-toastify";
import { useNavigate, redirect } from 'react-router-dom';

export const loader = (store) => async () => {
    const user = store.getState().userState.user;

    // Check if the user is logged in
    if (!user) {
        toast.warning("Anda Harus Login Dulu");
        return redirect('/login');
    }

    // Check if the user has the role of 'owner'
    if (user.role !== "owner") {
        toast.warning("Anda tidak bisa akses halaman ini");
        return redirect("/");
    }

    return null;
};

const CreateProductView = () => {
    const categories = ["Buku", "Pensil", "Pulpen", "Map"];
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl); // Set the image preview URL
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const dataForm = new FormData(form);

        const data = Object.fromEntries(dataForm);

        try {
            setLoading(true);
            // Upload file
            const responseFileUpload = await customAPI.post('/product/file-upload', {
                image: data.image,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response Image', responseFileUpload.data.url);

            // Create product
            await customAPI.post('/product', {
                name: data.name,
                price: data.price,
                description: data.description,
                stock: data.stock,
                category: data.category,
                image: responseFileUpload.data.url,
            });
            toast.success("Berhasil Tambah Produk");
            navigate('/products');
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Terjadi kesalahan";
            toast.error(errorMessage);
            console.error("Error creating product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <label className='form-control'>
                <label className='label'>
                    <span className='label-text capitalize'>image</span>
                </label>
                <input
                    type="file"
                    name="image"
                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                    onChange={handleFileChange} // Add onChange handler
                />
            </label>
            {imagePreview && (
                <div className="mt-2">
                    <img src={imagePreview} alt="Preview" className="w-full max-w-xs" />
                </div>
            )}
            <FormSelect name="category" label="Pilih Category" list={categories} />
            <FormInput name="name" label="Nama Product" type="text" required />
            <FormInput name="price" label="Harga Product" type="number" required />
            <FormInput name="stock" label="Stock Product" type="number" required />
            <FormTextArea name="description" label="Description Product" required />
            <input
                type="submit"
                value={loading ? "Loading..." : "Tambah"}
                className='btn btn-primary btn-block mt-5 btn-md'
                disabled={loading}
            />
        </form>
    );
};

export default CreateProductView;
