'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { assets } from "@/assets/assets";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 mb-20 space-y-16">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-orange-50/50 to-orange-100/30 p-8 md:p-14 rounded-2xl">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 text-orange-600 text-xs font-semibold uppercase tracking-wider">
              Who We Are
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
              Welcome to <span className="text-orange-600">IndraMart</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              At IndraMart, we believe in bridging the gap between quality technology and passionate consumers. Founded in 2025, we have grown from a local initiative to a leading digital marketplace specializing in state-of-the-art audio equipment, smartphones, computers, and smart accessories.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              We empower sellers to reach thousands of customers while ensuring that buyers receive authentic, tested, and high-performance products directly at their doorstep.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-sm border-4 border-white transform hover:scale-105 transition duration-300">
              <Image 
                src={assets.girl_with_headphone_image} 
                alt="IndraMart Mission" 
                className="w-full h-auto object-cover"
                width={600}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                <p className="text-white font-medium text-lg">Delivering Premium Audio Experiences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition space-y-4">
            <div className="h-12 w-12 rounded-xl bg-orange-600/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide a seamless, transparent, and trustworthy online shopping ecosystem where high-quality electronic items are accessible to everyone, backed by efficient customer care and secure logistic solutions.
            </p>
          </div>

          <div className="border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition space-y-4">
            <div className="h-12 w-12 rounded-xl bg-orange-600/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the most reliable and customer-centric digital marketplace in the region, recognized for supporting independent sellers and introducing smart consumer technology to every household.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="space-y-10 pt-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold text-gray-900">Why Customers Choose Us</h2>
            <p className="text-gray-500 max-w-lg mx-auto">We strive to maintain the highest standards of services to provide you with the best shopping experience.</p>
            <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl hover:bg-orange-50/30 transition border border-transparent hover:border-orange-500/20 text-center space-y-3 flex flex-col items-center">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <h3 className="font-semibold text-lg text-gray-900">Verified Products</h3>
              <p className="text-sm text-gray-600">All products go through robust quality verification tests before being dispatched.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl hover:bg-orange-50/30 transition border border-transparent hover:border-orange-500/20 text-center space-y-3 flex flex-col items-center">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              <h3 className="font-semibold text-lg text-gray-900">Secure Payments</h3>
              <p className="text-sm text-gray-600">We offer multiple secure payment methods including Cash on Delivery for absolute peace of mind.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl hover:bg-orange-50/30 transition border border-transparent hover:border-orange-500/20 text-center space-y-3 flex flex-col items-center">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H4a2 2 0 00-2 2v10a2 2 0 002 2h1.5m8.5-6h3.5m-5.5-2H6.5m10 5a1.5 1 0 11-3 0 1.5 1 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
              <h3 className="font-semibold text-lg text-gray-900">Fast Shipping</h3>
              <p className="text-sm text-gray-600">Partnered with elite courier services to deliver products to your doorstep on time.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl hover:bg-orange-50/30 transition border border-transparent hover:border-orange-500/20 text-center space-y-3 flex flex-col items-center">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <h3 className="font-semibold text-lg text-gray-900">24/7 Helpline</h3>
              <p className="text-sm text-gray-600">Our dedicated support representatives are ready to assist with any questions or claims.</p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default About;
