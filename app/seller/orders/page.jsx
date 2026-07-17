'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

const Orders = () => {

    const { currency, getToken } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSellerOrders = async () => {
        try {
            const res = await fetch('/api/seller/orders', {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error('Error fetching seller orders:', error);
        }
        setLoading(false);
    }

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await fetch('/api/seller/orders', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({ orderId, status: newStatus })
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Order status updated successfully');
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                toast.error(data.message || 'Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    }

    useEffect(() => {
        fetchSellerOrders();
    }, []);

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-5">
                <h2 className="text-lg font-medium">Orders</h2>
                <div className="max-w-4xl rounded-md">
                    {orders.length === 0 ? (
                        <p className="text-gray-500 py-8 text-center">No orders yet</p>
                    ) : orders.map((order, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300 bg-white shadow-sm rounded-lg mb-4">
                            <div className="flex-1 flex gap-5 max-w-80">
                                <Image
                                    className="max-w-16 max-h-16 object-cover"
                                    src={assets.box_icon}
                                    alt="box_icon"
                                />
                                <p className="flex flex-col gap-3">
                                    <span className="font-medium">
                                        {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                    </span>
                                    <span className="text-xs text-gray-500">Items : {order.items.length}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="font-medium">{order.address.fullName}</span>
                                    <br />
                                    <span className="text-xs text-gray-500">{order.address.area}</span>
                                    <br />
                                    <span className="text-xs text-gray-500">{`${order.address.city}, ${order.address.state}`}</span>
                                    <br />
                                    <span className="text-xs text-gray-500">{order.address.phoneNumber}</span>
                                </p>
                            </div>
                            <p className="font-medium my-auto">{currency}{order.amount}</p>
                            <div>
                                <p className="flex flex-col gap-1">
                                    <span>Method : COD</span>
                                    <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                    <span>Payment : {order.status === 'Delivered' ? 'Paid' : 'Pending'}</span>
                                </p>
                            </div>
                            
                            {/* Order Status Selector */}
                            <div className="flex flex-col justify-center gap-1 my-auto">
                                <label className="text-xs text-gray-500 font-medium">Order Status</label>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className="outline-none py-1.5 px-3 rounded border border-gray-300 text-xs bg-white text-gray-700 font-medium focus:border-orange-500 transition"
                                >
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>

                        </div>
                    ))}
                </div>
            </div>}
            <Footer />
        </div>
    );
};

export default Orders;