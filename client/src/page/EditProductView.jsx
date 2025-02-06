import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customAPI from '../api';
import Loading from '../components/Loading';
import FormInput from '../components/Form/FormInput';
import FormSelect from '../components/Form/FormSelect';
import FormTextArea from '../components/Form/FormTextArea';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

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


const EditProductView = () => {
  const categories = ["sepatu", "kemeja", "celana", "baju"];
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null); // State to handle new image file
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductId = async () => {
    try {
      const { data } = await customAPI.get(`/product/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]); // Store selected file in the state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); // Get form data from the form target
    const data = Object.fromEntries(formData.entries()); // Convert form data to object

    try {
      let imageUrl = product.image; // Preserve the existing image URL

      // If a new image file is selected, upload it
      if (image) {
        const responseFileUpload = await customAPI.post(
          '/product/file-upload',
          {
            image, // Pass the image file for upload
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        imageUrl = responseFileUpload.data.url; // Get the image URL from the response
      }

      // Update Product
      await customAPI.put(`/product/${id}`, {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category,
        image: imageUrl, // Include the updated image URL
      });

      toast.info("Berhasil Ubah Produk");
      navigate('/products');
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getProductId();
  }, []);

  return (
    <>
      {product ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Add file input for new image upload at the top */}
          <div className="form-group">
            <label htmlFor="image">Upload Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-control file-input file-input-bordered file-input-info w-full max-w-xs"
              onChange={handleFileChange}
            />
          </div>

          {/* Display previous image */}
          {product.image && (
            <div className="form-group">
              <label>Current Product Image</label>
              <div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                />
              </div>
            </div>
          )}

          <FormSelect
            name="category"
            label="Pilih Category"
            list={categories}
            defaultValue={product.category}
          />
          <FormInput
            name="name"
            label="Nama Product"
            type="text"
            defaultValue={product.name}
          />
          <FormInput
            name="price"
            label="Harga Product"
            type="number"
            defaultValue={product.price}
          />
          <FormInput
            name="stock"
            label="Stock Product"
            type="number"
            defaultValue={product.stock}
          />
          <FormTextArea
            name="description"
            label="Description Product"
            defaultValue={product.description}
          />
          
          <input type="submit" value="Edit" className="btn btn-primary btn-block mt-5 btn-md" />
        </form>
      ) : (
        <Loading /> // Display Loading component when fetching product data
      )}
    </>
  );
};

export default EditProductView;
