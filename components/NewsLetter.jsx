import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      <h1 className="md:text-4xl text-2xl font-medium">
        Subscribe now & get 20% off
      </h1>
      <p className="md:text-base text-gray-500/80 pb-8">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <form onSubmit={handleSubscribe} className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          suppressHydrationWarning
          className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          suppressHydrationWarning
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none text-nowrap"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
