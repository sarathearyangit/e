import { useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Order = ({ url }) => {

  const [orders, setorders] = useState([])

  // 🔥 FETCH ALL ORDERS
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        url + "/api/order/list",
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );

      if (response.data.success) {
        setorders(response.data.data);
      } else {
        console.log("Error fetching orders");
      }
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  // 🔥 UPDATE STATUS (INSTANT UI UPDATE)
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post(
        url + "/api/order/status",
        {
          orderId,
          status: newStatus
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );

      if (response.data.success) {
        // ✅ instant UI update (no reload)
        setorders(prev =>
          prev.map(order =>
            order._id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );
      }

    } catch (error) {
      console.log("STATUS UPDATE ERROR:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='px-4 sm:px-6 w-full'>

      <h3 className='text-2xl text-center font-semibold mb-6'>Orders</h3>

      <div className='flex flex-col gap-5 max-w-5xl mx-auto'>

        {orders.length === 0 ? (
          <p className='text-gray-700'>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className='flex flex-col md:flex-row w-full border border-zinc-400 rounded-lg p-4 gap-4 items-start md:items-center justify-between bg-white'
            >

              {/* ✅ IMAGE */}
              <img src={assets.parcel_icon} alt="parcel" className='w-12' />

              {/* ✅ ORDER DETAILS */}
              <div className='flex-1 flex flex-col gap-1'>
                <p className='text-sm'>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx !== order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>

                {/* ✅ FIXED ADDRESS (string safe) */}
                <p className='font-medium'>
                  {typeof order.address === "string"
                    ? order.address
                    : `${order.address.firstName || ""} ${order.address.lastName || ""}`}
                </p>

                {/* ✅ OPTIONAL ADDRESS DETAILS */}
                {typeof order.address !== "string" && (
                  <div className='text-sm text-gray-600'>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                    </p>
                    <p>Phone: {order.address.phone}</p>
                  </div>
                )}
              </div>

              {/* ✅ RIGHT SIDE */}
              <div className='flex flex-col gap-2'>
                <p>Items: {order.items.length}</p>

                <p className='font-medium'>₹{order.amount}</p>

                {/* ✅ STATUS DROPDOWN */}
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className='border border-zinc-400 rounded-lg px-2 py-1 outline-none'
                >
                  <option value="Processing">Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  )
}

export default Order