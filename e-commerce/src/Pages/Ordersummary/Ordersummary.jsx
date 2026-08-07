import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/Storecontext";
import axios from "axios";

const Ordersummary = () => {

    const {
        cart,
        subtotal,
        shippingfee,
        orderTotal,
        token,
        setOrderSummary,
        setcart
    } = useContext(StoreContext);

    const [user, setUser] = useState(null);
    const [address, setAddress] = useState("");   // ✅ NEW STATE

    const url = "https://e-backened.onrender.com";

    // 🔥 FETCH LOGGED-IN USER
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    url + "/api/user/profile",
                    {
                        headers: {
                            token: token
                        }
                    }
                );

                if (res.data.success) {
                    setUser(res.data.data);
                    console.log("USER DATA:", res.data.data);
                }

            } catch (error) {
                console.log("USER FETCH ERROR:", error);
            }
        };

        if (token) {
            fetchUser();
        }
    }, [token]);



    const orderSumm = async () => {
        try {

            // ✅ VALIDATION
            if (!address) {
                alert("Please enter address");
                return;
            }

            let orderItems = cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }));

            let orderData = {
                items: orderItems,
                amount: orderTotal,
                address: address   // ✅ FIXED
            };

            const response = await axios.post(
                url + "/api/order/place",
                orderData,
                {
                    headers: {
                        token: token
                    }
                }
            );

            if (response.data.success) {
                setcart([]);
                localStorage.setItem("orderAmount", orderTotal);
                window.location.href = response.data.session_url;
            } else {
                console.log("Backend response:", response.data);
                alert(response.data.message);
            }

        } catch (error) {
            console.log("ORDER ERROR:", error);
            alert("Something went wrong");
        }
    };



    return (
    <section className='flex justify-center items-center bg-black/95 fixed inset-0 z-40 px-3 sm:px-4'>

        <div className='bg-zinc-100 rounded-lg p-4 sm:p-6 md:p-8 border border-zinc-300 w-full max-w-sm sm:max-w-md md:max-w-xl max-h-[90vh] overflow-y-auto'>

            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center'>
                Order Summary
            </h2>

            <div>
                <div className='border-b max-h-40 sm:max-h-52 overflow-y-auto'>
                    {
                        cart.map(item => (
                            <div key={item._id} className='flex justify-between text-xs sm:text-sm md:text-base py-1'>
                                <span className="truncate max-w-[60%]">
                                    {item.name} (x{item.quantity})
                                </span>
                                <span>
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))
                    }
                </div>

                <div className='flex justify-between pt-4 text-xs sm:text-sm md:text-base'>
                    <span>SubTotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className='flex justify-between py-2 text-xs sm:text-sm md:text-base'>
                    <span>Shipping</span>
                    <span>₹{shippingfee.toFixed(2)}</span>
                </div>

                <div className='flex justify-between pt-3 border-t mb-4 text-sm sm:text-base md:text-lg'>
                    <span className='font-bold'>Total</span>
                    <span className='font-bold'>₹{orderTotal.toFixed(2)}</span>
                </div>
            </div>

            {/* ADDRESS */}
            <textarea
                placeholder="Enter your full address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border p-2 rounded mt-3 text-sm sm:text-base"
                rows={3}
            />

            {/* BUTTONS */}
            <div className='flex flex-col sm:flex-row mt-5 gap-3'>
                <button
                    className='bg-gray-800 text-white py-2 rounded w-full text-sm sm:text-base'
                    onClick={() => setOrderSummary(false)}
                >
                    Cancel
                </button>

                <button
                    className='bg-blue-600 text-white py-2 rounded w-full text-sm sm:text-base'
                    onClick={orderSumm}
                >
                    Proceed
                </button>
            </div>

        </div>

    </section>
);
};

export default Ordersummary;
