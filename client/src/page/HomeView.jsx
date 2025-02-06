import React, { useState, useEffect } from "react";
import customAPI from "../api";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero";
import CardProduct from "../components/CardProduct";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/product?limit=3");
  const products = data.data;
  return { products };
};

const HomeView = () => {
  const { products } = useLoaderData();
  const [loading, setLoading] = useState(true);

  // Simulate loading by setting a delay (you can remove this if your loader is async).
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // After a delay, loading is set to false
    }, 1200); // Example delay for 1 second
  }, []);

  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Product List</h2>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-primary" role="status"></div>
          <span className="ml-2 text-primary">Loading products...</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {products.length > 0 ? (
            products.map((item) => (
              <CardProduct item={item} key={item._id} />
            ))
          ) : (
            <div className="col-span-full text-center mt-10">
              <h2 className="font-semibold text-3xl">
                No products available
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomeView;
