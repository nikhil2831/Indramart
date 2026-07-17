'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

const MyOrders = () => {

    const { currency, getToken } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const currentToken = getToken();
            if (!currentToken) {
                setLoading(false);
                return;
            }
            const res = await fetch('/api/orders', {
                headers: { 'Authorization': `Bearer ${currentToken}` }
            });
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {loading ? <Loading /> : (<div className="max-w-5xl border-t border-gray-300 text-sm">
                        {orders.length === 0 ? (
                            <p className="text-gray-500 py-8 text-center">No orders yet. Start shopping!</p>
                        ) : orders.map((order, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium text-base">
                                            {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                        </span>
                                        <span>Items : {order.items.length}</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-medium">{order.address.fullName}</span>
                                        <br />
                                        <span >{order.address.area}</span>
                                        <br />
                                        <span>{`${order.address.city}, ${order.address.state}`}</span>
                                        <br />
                                        <span>{order.address.phoneNumber}</span>
                                    </p>
                                </div>
                                <p className="font-medium my-auto">{currency}{order.amount}</p>
                                <div>
                                    <p className="flex flex-col gap-1">
                                        <span>Method : COD</span>
                                        <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                        <span>Payment : <span className={order.status === 'Delivered' ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>{order.status === 'Delivered' ? 'Paid' : 'Pending'}</span></span>
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center items-start md:items-end gap-1.5 my-auto">
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2.5 w-2.5 rounded-full ${
                                            order.status === 'Delivered' ? 'bg-green-500' :
                                            order.status === 'Out for Delivery' ? 'bg-indigo-500' :
                                            order.status === 'Shipped' ? 'bg-purple-500' :
                                            order.status === 'Packing' ? 'bg-yellow-500' : 'bg-orange-500'
                                        }`}></span>
                                        <span className="font-semibold text-gray-800 text-sm">{order.status}</span>
                                    </div>
                                    <button onClick={fetchOrders} className="text-xs border px-3 py-1 rounded hover:bg-gray-50 transition">Track Order</button>
                                </div>
                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;