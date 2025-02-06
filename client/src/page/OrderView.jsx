import React, { useState, useMemo } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { priceFormat } from "../utils";
import customAPI from "../api";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;

  if (!user) {
    toast.warn("Login untuk mengakses halaman Order");
    return redirect("/login");
  }

  const endpoint = user.role === "owner" ? "/order" : "/order/current/user";

  try {
    const { data } = await customAPI.get(endpoint);
    return data;
  } catch (error) {
    toast.error("Failed to fetch orders. Please try again later.");
    return redirect("/error");
  }
};

const OrderView = () => {
  const user = useSelector((state) => state.userState.user); // Get user from Redux

  const { data: orders } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = filterStatus ? order.status === filterStatus : true;
      const matchesSearch = order.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            order.lastName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [orders, filterStatus, searchQuery]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const displayedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
      .slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handlePrint = () => {
    const grandTotal = filteredOrders.reduce((sum, order) => {
      return sum + calculateTotalPrice(order.itemsDetail);
    }, 0);
  
    // Filter out only orders with the status "success"
    const successfulOrders = filteredOrders.filter(order => order.status === 'success');
  
    const reportRows = successfulOrders.map((order) => {
      const totalPrice = calculateTotalPrice(order.itemsDetail);
      return `\
        <tr>
          <td>${order.firstName} ${order.lastName}</td>
          <td>${order.itemsDetail
            .map((item) => `${item.name} (${item.quantity} pcs)`)
            .join(", ")}</td>
          <td>${priceFormat(totalPrice)}</td>
        </tr>
      `;
    }).join("");
  
    const printContent = `\
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 24px; font-weight: bold;">Order Report</h1>
        <p style="font-size: 18px;">Status: Success</p>
        <p style="font-size: 14px;">Date: ${new Date().toLocaleDateString()}</p>
      </div>
      
      <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Order By</th>
            <th>Items</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${reportRows}
          <tr>
            <td colspan="2" style="text-align: right; font-weight: bold;">Grand Total</td>
            <td>${priceFormat(grandTotal)}</td>
          </tr>
        </tbody>
      </table>
    `;
  
    const printWindow = window.open("", "PRINT", "height=600,width=800");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="overflow-x-auto p-4 bg-gray-900 text-gray-200">
      {/* Filters and Search */}
      <div className="mb-4 flex items-center justify-between">
        {/* Existing filters and search input */}
      </div>

      {displayedOrders.length === 0 ? (
        <h1 className="text-center text-xl font-bold">No Orders Found</h1>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-600">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-600 px-4 py-2">No</th>
              <th className="border border-gray-600 px-4 py-2">Order By</th>
              <th className="border border-gray-600 px-4 py-2">Nama Barang</th>
              <th className="border border-gray-600 px-4 py-2">Pcs</th>
              <th className="border border-gray-600 px-4 py-2">Total</th>
              <th className="border border-gray-600 px-4 py-2">Status</th>
              <th className="border border-gray-600 px-4 py-2">Created At</th>
              <th className="border border-gray-600 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order, index) => (
              <tr key={order._id} className="odd:bg-gray-800 even:bg-gray-700">
                <td className="border border-gray-600 px-4 py-2 text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="border border-gray-600 px-4 py-2">{order.firstName} {order.lastName}</td>
                <td className="border border-gray-600 px-4 py-2">
                  {order.itemsDetail.map((item) => `${item.name}`).join(", ")}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {order.itemsDetail.reduce((sum, item) => sum + item.quantity, 0)} pcs
                </td>
                <td className="border border-gray-600 px-4 py-2 text-right">{priceFormat(calculateTotalPrice(order.itemsDetail))}</td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  <span className={`badge ${order.status === "success" ? "badge-success" : "badge-warning"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-600 px-4 py-2 text-center">
                  <Link
                    to={`/order/${order._id}`}
                    className="btn btn-secondary bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        {user?.role === "owner" && (
          <button
            onClick={handlePrint}
            className="btn btn-secondary bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700"
          >
            Print Report
          </button>
        )}

        <div className="flex items-center">
          <button
            className="btn btn-primary bg-gray-800 text-gray-200 mx-1 border-gray-600 hover:bg-gray-700"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-2">Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-primary bg-gray-800 text-gray-200 mx-1 border-gray-600 hover:bg-gray-700"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
