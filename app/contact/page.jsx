'use client'
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Thank you for contacting us! We will get back to you shortly.");
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 mb-20 space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">Contact Us</h1>
          <p className="text-gray-500 max-w-lg mx-auto">Have queries or feedback? We would love to hear from you. Get in touch with our team.</p>
          <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Details Panel */}
          <div className="lg:col-span-2 space-y-8 bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              For any product inquiries, shipping details, or technical assistance, feel free to visit our office or contact us through our helpline.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-orange-600/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Office Address</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Indra Nagar, Lucknow
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-orange-600/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Helpline Number</h4>
                  <p className="text-sm text-gray-600 mt-1">+91 98765 43210</p>
                  <p className="text-xs text-gray-500 mt-0.5">Mon - Sat: 9:00 AM to 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-orange-600/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email Address</h4>
                  <p className="text-sm text-gray-600 mt-1">support@indramart.in</p>
                  <p className="text-sm text-gray-600">contact@indramart.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full outline-none py-2.5 px-4 rounded border border-gray-300 focus:border-orange-500 transition"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700" htmlFor="email">Email ID</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full outline-none py-2.5 px-4 rounded border border-gray-300 focus:border-orange-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject of your query"
                  className="w-full outline-none py-2.5 px-4 rounded border border-gray-300 focus:border-orange-500 transition"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full outline-none py-2.5 px-4 rounded border border-gray-300 focus:border-orange-500 transition resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default Contact;
