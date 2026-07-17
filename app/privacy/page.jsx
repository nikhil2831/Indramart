'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 mb-20 space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-500 max-w-lg mx-auto">Last updated: February 15, 2026. Please read our privacy practices carefully.</p>
          <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 md:p-12 space-y-8 shadow-sm">
          
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Welcome to IndraMart (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy informs you how we look after your personal data when you visit our website (regardless of where you visit it from) and tells you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">2. The Data We Collect About You</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes payment card details (processed securely via our payment gateway partners).</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">3. How We Use Your Personal Data</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
              <li>To register you as a new customer/seller.</li>
              <li>To process and deliver your order including: managing payments, fees and charges, and collecting money owed to us.</li>
              <li>To manage our relationship with you which will include notifying you about changes to our terms or privacy policy.</li>
              <li>To administer and protect our business and this website.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">4. Data Security</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">5. Your Legal Rights</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, or to withdraw consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">6. Contact Details</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:privacy@indramart.in" className="text-orange-600 font-medium hover:underline">privacy@indramart.in</a>.
            </p>
          </section>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default Privacy;
