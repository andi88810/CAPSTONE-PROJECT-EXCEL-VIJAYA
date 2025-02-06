// File: ./page/OrderDetailView.js

import React from "react";
import { useLoaderData } from "react-router-dom";
import { priceFormat } from "../utils";
import customAPI from "../api";
import { useSelector } from "react-redux";

// Loader to fetch order details
export const orderDetailLoader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await customAPI.get(`/order/${id}`);
    return response.data; // Return the `data` object from the response
  } catch (error) {
    throw new Error("Failed to load order details.");
  }
};

const OrderDetailView = () => {
  const user = useSelector((state) => state.userState.user); // Get user from Redux
  const { data: order } = useLoaderData(); // Fetch order data from loader

  // Ensure `itemsDetail` and `shippingAddress` are safe to use
  const itemsDetail = Array.isArray(order.itemsDetail) ? order.itemsDetail : [];
  const shippingAddress = order.shippingAddress || {};

  // Calculate total price of items
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Function to print the page
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Order Receipt</h1>

      {/* Customer Information */}
      <p>
        <strong>Name:</strong> {order.firstName} {order.lastName}
      </p>
      <p>
        <strong>Email:</strong> {order.email}
      </p>
      <p>
        <strong>Phone:</strong> {order.phone}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>

      {/* Shipping Address */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
        {Object.keys(shippingAddress).length > 0 ? (
          <>
            <p>{shippingAddress.addressLine1}</p>
            <p>{shippingAddress.addressLine2}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.state} -{" "}
              {shippingAddress.postalCode}
            </p>
            <p>{shippingAddress.country}</p>
          </>
        ) : (
          <p>No shipping address provided.</p>
        )}
      </div>

      {/* Order Items */}
      <table className="table-auto w-full border-collapse border border-gray-600 mt-4">
        <thead className="bg-gray-800">
          <tr>
            <th className="border border-gray-600 px-4 py-2">Item</th>
            <th className="border border-gray-600 px-4 py-2">Quantity</th>
            <th className="border border-gray-600 px-4 py-2">Price</th>
            <th className="border border-gray-600 px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {itemsDetail.map((item, index) => (
            <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2">{item.name}</td>
              <td className="border border-gray-600 px-4 py-2 text-center">
                {item.quantity}
              </td>
              <td className="border border-gray-600 px-4 py-2 text-right">
                {priceFormat(item.price)}
              </td>
              <td className="border border-gray-600 px-4 py-2 text-right">
                {priceFormat(item.quantity * item.price)}
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan="3"
              className="border border-gray-600 px-4 py-2 text-right font-bold"
            >
              Grand Total
            </td>
            <td className="border border-gray-600 px-4 py-2 text-right font-bold">
              {priceFormat(calculateTotalPrice(itemsDetail))}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer Message */}
      <div className="mt-4">
        <p className="text-sm text-gray-400">
          Thank you for shopping with us! Your order details are listed above.
        </p>
      </div>

      {/* Print Button */}
      <div className="mt-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Print Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetailView;
