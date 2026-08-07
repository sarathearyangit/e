import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [searchterm, setsearchterm] = useState("");
    const [isScrolled, setisScrolled] = useState(false);
    const [activepanel, setactivepanel] = useState(null);
    const [token, settoken] = useState("");

    const [item_list, setItemList] = useState([]);

    const [cart, setcart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlist, setwishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    const [OrderSummary, setOrderSummary] = useState(false);
    const [loading, setLoading] = useState(true);

    const urlBase = "https://e-backened.onrender.com";

    // ------------------ CALCULATIONS ------------------
    const subtotal = cart.reduce((acc, item) =>
        acc + (item.price || 0) * (item.quantity || 0), 0
    );

    const totalItems = cart.reduce((acc, item) =>
        acc + (item.quantity || 0), 0
    );

    const shippingfee = totalItems * 4;
    const orderTotal = shippingfee + subtotal;

    // ------------------ NAVBAR SCROLL ------------------
    useEffect(() => {
        const changeNavbar = () => setisScrolled(window.scrollY > 10);
        window.addEventListener("scroll", changeNavbar);
        return () => window.removeEventListener("scroll", changeNavbar);
    }, []);

    const handlescroll = () => {
        const section = document.getElementById("product-section");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    const handlepannel = (tabName) => {
        setactivepanel((prev) => (prev === tabName ? null : tabName));
    };

    const handleclose = () => setactivepanel(null);

    // ------------------ FETCH ITEMS ------------------
    const fetchItemList = async () => {
        try {
            const res = await axios.get(urlBase + "/api/item/list");
            setItemList(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // ------------------ FETCH CART ------------------
    const fetchCart = async (tok) => {
        try {
            const res = await axios.post(
                urlBase + "/api/cart/get",
                {},
                { headers: { token: tok } }
            );

            const cartData = res.data.cartData || {};

            const items = Object.keys(cartData)
                .map(id => {
                    const product = item_list.find(
                        p => p._id.toString() === id.toString()
                    );

                    if (!product) return null;

                    return {
                        ...product,
                        quantity: cartData[id]
                    };
                })
                .filter(Boolean);

            // 🔥 prevent overwrite if mapping fails
            if (items.length === 0 && Object.keys(cartData).length > 0) return;
            setcart(items);

        } catch (error) {
            console.log(error);
        }
    };

    // ------------------ FETCH WISHLIST ------------------
    const fetchWishlist = async (tok) => {
        try {
            const res = await axios.post(
                urlBase + "/api/wishlist/get",
                {},
                { headers: { token: tok } }
            );

            const wishlistObj = res.data.wishlistData || {};

            const items = Object.keys(wishlistObj)
                .map(id =>
                    item_list.find(p => p._id.toString() === id.toString())
                )
                .filter(Boolean);

            // 🔥 prevent overwrite if mapping fails
            if (items.length === 0 && Object.keys(wishlistObj).length > 0) return;
            setwishlist(items);

        } catch (error) {
            console.log(error);
        }
    };

    // ------------------ CART ACTIONS ------------------
    const addToCart = async (product) => {
        setcart(prev => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) return prev;
            return [...prev, { ...product, quantity: 1 }];
        });

        if (token) {
            await axios.post(
                urlBase + "/api/cart/add",
                { productId: product._id },
                { headers: { token } }
            );
        }
    };

    const removeFromCart = async (product) => {
        setcart(prev => prev.filter(item => item._id !== product._id));

        if (token) {
            await axios.post(
                urlBase + "/api/cart/remove",
                { productId: product._id },
                { headers: { token } }
            );
        }
    };

    const quantityInc = async (product) => {
        setcart(prev =>
            prev.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

        if (token) {
            await axios.post(
                urlBase + "/api/cart/add",
                { productId: product._id },
                { headers: { token } }
            );
        }
    };

    const quantityDec = async (product) => {
        setcart(prev =>
            prev.map(item =>
                item._id === product._id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );

        if (token) {
            await axios.post(
                urlBase + "/api/cart/remove",
                { productId: product._id },
                { headers: { token } }
            );
        }
    };

    // ------------------ WISHLIST ------------------
    const addtowish = async (product) => {
        if (!token) return;

        const exists = wishlist.some(
            item => item._id.toString() === product._id.toString()
        );

        try {
            if (exists) {
                await axios.post(
                    urlBase + "/api/wishlist/remove",
                    { productId: product._id },
                    { headers: { token } }
                );

                setwishlist(prev =>
                    prev.filter(item => item._id !== product._id)
                );
            } else {
                await axios.post(
                    urlBase + "/api/wishlist/add",
                    { productId: product._id },
                    { headers: { token } }
                );

                setwishlist(prev => [...prev, product]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const clearwish = () => setwishlist([]);

    // ------------------ INITIAL LOAD ------------------
    useEffect(() => {
        const loadData = async () => {
            const tok = localStorage.getItem("token");
            if (tok) settoken(tok);

            await fetchItemList();
        };

        loadData();
    }, []);

    // ------------------ LOAD USER DATA ------------------
    useEffect(() => {
        if (!token || item_list.length === 0) return;

        const loadUserData = async () => {
            setLoading(true);

            await fetchCart(token);
            await fetchWishlist(token);

            setLoading(false);
        };

        loadUserData();

    }, [token, item_list.length]);

    // ------------------ LOCAL STORAGE ------------------
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // ------------------ CONTEXT ------------------
    const contextvalue = {
        handlescroll,
        setsearchterm,
        searchterm,
        isScrolled,
        handlepannel,
        totalItems,
        wishlist,
        cart,
        setcart,

        addToCart,
        removeFromCart,
        addtowish,
        clearwish,
        quantityInc,
        quantityDec,

        subtotal,
        shippingfee,
        orderTotal,
        url: urlBase,
        item_list,

        activepanel,
        handleclose,
        OrderSummary,
        setOrderSummary,
        token,
        settoken,

        loading,
    };

    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
