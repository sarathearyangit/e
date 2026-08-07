import { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../Context/Storecontext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrder = () => {

    const { url, token } = useContext(StoreContext)
    const [data, setdata] = useState([])

    // 🔥 FETCH USER ORDERS
    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                url + "/api/order/userorders",
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                setdata(response.data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    // 🔥 STATUS COLOR FUNCTION
    const getStatusColor = (status) => {
        if (status === "Processing") return "text-red-500";
        if (status === "Out for delivery") return "text-yellow-500";
        if (status === "Delivered") return "text-green-500";
        return "text-gray-500"; // fallback
    }

    const trackOrder = (order) => {
        alert(`Order Status: ${order.status}`)
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    return (
        <div className='mt-10 px-3 sm:px-5 md:px-8 lg:px-10 pb-20 w-full flex flex-col'>

            <h2 className='text-xl sm:text-2xl font-semibold mb-5 text-center'>
                My Orders
            </h2>

            <div className='flex flex-col gap-4'>

                {data.length === 0 ? (
                    <p className='text-gray-700 text-center'>No orders found.</p>
                ) : (
                    data.map((order) => (
                        <div
                            key={order._id}
                            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 items-center border border-zinc-400 p-3 sm:p-4 rounded-lg gap-3 bg-white text-sm md:text-base'
                        >

                            {/* IMAGE */}
                            <div className='flex justify-center md:justify-start'>
                                <img src={assets.parcel_icon} alt="parcel" className='w-10 sm:w-12' />
                            </div>

                            {/* ITEMS */}
                            <p className='sm:col-span-2 md:col-span-2 text-center md:text-left'>
                                {order.items?.map((item, index) => (
                                    <span key={index}>
                                        {item.name} x {item.quantity}
                                        {index !== order.items.length - 1 && ", "}
                                    </span>
                                ))}
                            </p>

                            {/* AMOUNT */}
                            <p className='font-medium text-center md:text-left'>
                                ₹{order.amount}.00
                            </p>

                            {/* ITEM COUNT */}
                            <p className='text-center md:text-left'>
                                Items: {order.items?.length}
                            </p>

                            {/* STATUS */}
                            <p className='text-center md:text-left'>
                                <span className={`${getStatusColor(order.status)} mr-1`}>
                                    &#x25cf;
                                </span>
                                <b className={getStatusColor(order.status)}>
                                    {order.status}
                                </b>
                            </p>

                            {/* BUTTON */}
                            <button
                                className='bg-red-200 px-3 py-2 rounded-xl hover:bg-red-300 transition w-full md:w-auto'
                                onClick={() => trackOrder(order)}
                            >
                                Track Order
                            </button>

                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default MyOrder