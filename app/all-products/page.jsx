'use client'
import React, { useState, useEffect, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";

const categories = ["Earphone", "Headphone", "Watch", "Smartphone", "Laptop", "Camera", "Accessories"];

const AllProductsContent = () => {
    const { products } = useAppContext();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState("latest");
    const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

    // Sync filters with URL query parameters on load
    useEffect(() => {
        const categoryParam = searchParams.get("category");
        const searchParam = searchParams.get("search");

        if (categoryParam) {
            setSelectedCategories([categoryParam]);
        }
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [searchParams]);

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Filter and sort products
    const filteredProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortOption === "price-low") {
                return a.offerPrice - b.offerPrice;
            } else if (sortOption === "price-high") {
                return b.offerPrice - a.offerPrice;
            } else {
                return b.date - a.date;
            }
        });

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full pt-8 pb-14">
            
            {/* Left Column: Sidebar Filters */}
            <div className={`lg:w-1/4 w-full ${showFilters ? 'block' : 'hidden lg:block'} space-y-6 bg-gray-50 border border-gray-200 p-6 rounded-2xl h-fit`}>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
                    <button 
                        onClick={() => { setSelectedCategories([]); setSearchQuery(""); }} 
                        className="text-xs text-orange-600 font-medium hover:underline"
                    >
                        Clear All
                    </button>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-800 uppercase tracking-wider">Categories</h4>
                    <div className="flex flex-col gap-2.5">
                        {categories.map((category) => (
                            <label key={category} className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="accent-orange-600 h-4 w-4 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <span>{category}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Products & Search/Sort */}
            <div className="flex-1 space-y-6">
                
                {/* Search and Sort controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    
                    {/* Search Bar */}
                    <div className="relative w-full sm:max-w-md">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 outline-none rounded-xl border border-gray-300 focus:border-orange-500 transition text-sm text-gray-700"
                        />
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        {/* Mobile filter toggle */}
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden px-4 py-2.5 border rounded-xl text-sm flex items-center gap-2 hover:bg-gray-50 border-gray-300 font-medium"
                        >
                            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                            </svg>
                            Filters
                        </button>

                        {/* Sort selector */}
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="outline-none py-2.5 px-4 rounded-xl border border-gray-300 focus:border-orange-500 text-sm text-gray-700 bg-white"
                        >
                            <option value="latest">Sort by: Latest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>

                </div>

                {/* Product list grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                        <h3 className="font-semibold text-lg text-gray-900">No Products Found</h3>
                        <p className="text-gray-500 mt-1 text-sm">Try adjusting your filters or search keywords.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

const AllProducts = () => {
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 min-h-screen">
                <div className="flex flex-col items-start pt-12">
                    <p className="text-2xl font-medium text-gray-900">All Products</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full mt-1.5"></div>
                </div>
                <Suspense fallback={<Loading />}>
                    <AllProductsContent />
                </Suspense>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
