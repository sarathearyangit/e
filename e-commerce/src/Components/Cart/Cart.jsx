import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/Storecontext";

const Cart = () => {

    const navigate = useNavigate();

    const {
        activepanel,
        url,
        handleclose,
        cart,
        removeFromCart,
        quantityInc,
        quantityDec,
        subtotal,
        shippingfee,
        orderTotal
    } = useContext(StoreContext);

    return (
        <div className={`flex flex-col justify-between gap-4 bg-zinc-100 fixed top-0 bottom-0 right-0 z-50 w-full sm:w-96 py-5 border-l border-zinc-300 transform transition-transform duration-300 ${activepanel === 'cart' ? 'translate-x-0' : 'translate-x-full'}`}>

            {/* ✅ Heading */}
            <div className='px-4 sm:px-6'>
                <h3 className='text-xl sm:text-2xl font-bold text-center text-zinc-800'>
                    Cart
                </h3>
            </div>

            {/* ✅ Cart Items */}
            <div className='flex-1 flex flex-col gap-2 overflow-y-auto px-2 sm:px-4'>

                {cart.length === 0 ? (
                    <p className='text-zinc-800 text-center'>Your cart is empty</p>
                ) : (
                    cart.map((product, index) => (
                        <div
                            key={product._id}
                            className={`flex gap-2 sm:gap-3 p-2 rounded ${index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}`}
                        >

                            {/* Image */}
                            <div className='w-14 h-14 sm:w-16 sm:h-16 shrink-0'>
                                <img
                                    src={`${url}/images/${product.image}`}
                                    alt=""
                                    className='object-contain w-full h-full'
                                />
                            </div>

                            {/* Details */}
                            <div className='flex-1 flex flex-col justify-between'>

                                {/* Top */}
                                <div className='flex justify-between items-start'>
                                    <h4 className='text-sm sm:text-base font-semibold text-zinc-800 line-clamp-1'>
                                        {product.name}
                                    </h4>

                                    <button
                                        className='w-6 h-6 sm:w-7 sm:h-7 bg-red-500 rounded-full text-white flex justify-center items-center text-xs'
                                        onClick={() => removeFromCart(product)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>

                                {/* Bottom */}
                                <div className='flex justify-between items-center'>

                                    {/* Price */}
                                    <div className='text-sm sm:text-base'>
                                        {product.onSale && (
                                            <span className='text-zinc-400 line-through mr-2'>
                                                ${product.oldprice.toFixed(2)}
                                            </span>
                                        )}
                                        <span className='text-red-600 font-semibold'>
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Quantity */}
                                    <div className='flex items-center gap-1 sm:gap-2'>
                                        <button
                                            className='w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs'
                                            onClick={() => quantityDec(product)}
                                        >
                                            <FaMinus />
                                        </button>

                                        <span className='text-sm'>{product.quantity}</span>

                                        <button
                                            className='w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs'
                                            onClick={() => quantityInc(product)}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ✅ Totals */}
            <div className='px-4 sm:px-6 border-t border-zinc-300 pt-3 text-sm sm:text-base'>
                <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className='flex justify-between py-1'>
                    <span>Shipping</span>
                    <span>${shippingfee.toFixed(2)}</span>
                </div>

                <div className='flex justify-between pt-2 border-t'>
                    <span className='font-bold text-blue-600'>Total</span>
                    <span className='font-bold text-blue-600'>
                        ${orderTotal.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* ✅ Buttons */}
            <div className='flex gap-2 px-4 sm:px-6'>
                <button
                    className='bg-gray-700 text-white py-2 flex-1 rounded text-sm sm:text-base'
                    onClick={handleclose}
                >
                    Close
                </button>

                <button
                    className={`py-2 flex-1 rounded text-sm sm:text-base text-white ${cart.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600'
                        }`}
                    disabled={cart.length === 0}
                    onClick={() => {
                        handleclose();
                        navigate("/ordersummary");
                    }}
                >
                    Checkout
                </button>
            </div>

        </div>
    );
};

export default Cart;