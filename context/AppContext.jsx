'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState(null)

    // Load token from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, [])

    // Fetch products from API
    const fetchProductData = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Fetch user data from API
    const fetchUserData = async () => {
        try {
            const currentToken = localStorage.getItem('token');
            if (!currentToken) {
                setUserData(null);
                setIsSeller(false);
                return;
            }
            const res = await fetch('/api/user', {
                headers: { 'Authorization': `Bearer ${currentToken}` }
            });
            const data = await res.json();
            if (data.success) {
                setUserData(data.user);
                setIsSeller(data.user.role === 'seller');
            } else {
                setUserData(null);
                setIsSeller(false);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    // Fetch cart from API
    const fetchCart = async () => {
        try {
            const currentToken = localStorage.getItem('token');
            if (!currentToken) return;
            const res = await fetch('/api/cart', {
                headers: { 'Authorization': `Bearer ${currentToken}` }
            });
            const data = await res.json();
            if (data.success) {
                setCartItems(data.cartItems);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    // Login function
    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setUserData(data.user);
                setIsSeller(data.user.role === 'seller');
                toast.success('Login successful!');
                router.push('/');
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error('Login failed');
            return false;
        }
    }

    // Register function
    const register = async (name, email, password, role = 'user') => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role })
            });
            const data = await res.json();
            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setUserData(data.user);
                setIsSeller(data.user.role === 'seller');
                toast.success('Registration successful!');
                router.push('/');
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error('Registration failed');
            return false;
        }
    }

    // Logout function
    const logout = () => {
        setToken(null);
        setUserData(null);
        setIsSeller(false);
        setCartItems({});
        localStorage.removeItem('token');
        toast.success('Logged out');
        router.push('/');
    }

    // Add to cart
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

        // Sync with server if logged in
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
            try {
                await fetch('/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentToken}`
                    },
                    body: JSON.stringify({ productId: itemId, quantity: cartData[itemId] })
                });
            } catch (error) {
                console.error('Error syncing cart:', error);
            }
        }
    }

    // Update cart quantity
    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);

        // Sync with server if logged in
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
            try {
                await fetch('/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentToken}`
                    },
                    body: JSON.stringify({ productId: itemId, quantity })
                });
            } catch (error) {
                console.error('Error syncing cart:', error);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo && cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if (token) {
            fetchUserData();
            fetchCart();
        }
    }, [token])

    const getToken = () => {
        return localStorage.getItem('token');
    }

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        token, getToken,
        login, register, logout,
        fetchCart
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}