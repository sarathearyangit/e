import { useContext } from "react"
import { StoreContext } from "../../Context/Storecontext"

const Wishlist = () => {

    const {
        activepanel,
        url,
        handleclose,
        wishlist,
        addToCart,
        clearwish
    } = useContext(StoreContext)

    return (
        <div className={`flex flex-col justify-between gap-4 bg-zinc-100 fixed top-0 bottom-0 right-0 z-50 w-full sm:w-96 py-5 border-l border-zinc-300 transform transition-transform duration-300 ${
            activepanel === 'wishlist' ? 'translate-x-0' : 'translate-x-full'
        }`}>

            {/* ✅ Heading */}
            <div className='px-4 sm:px-6'>
                <h3 className='text-xl sm:text-2xl font-bold text-center text-zinc-800'>
                    Wishlist
                </h3>
            </div>

            {/* ✅ Items */}
            <div className='flex-1 flex flex-col gap-2 overflow-y-auto px-2 sm:px-4'>

                {
                    wishlist.length === 0 ? (
                        <p className='text-zinc-800 text-center'>Your wishlist is empty</p>
                    ) : (
                        wishlist.map((product, index) => (
                            <div
                                key={product._id}
                                className={`flex gap-2 sm:gap-3 p-2 rounded ${
                                    index % 2 === 0 ? 'bg-blue-100' : 'bg-white'
                                }`}
                            >

                                {/* ✅ Image */}
                                <div className='w-14 h-14 sm:w-16 sm:h-16 shrink-0'>
                                    <img
                                        src={`${url}/images/${product.image}`}
                                        alt=""
                                        className='object-contain w-full h-full'
                                    />
                                </div>

                                {/* ✅ Details */}
                                <div className='flex-1 flex flex-col justify-between'>

                                    {/* Top */}
                                    <div className='flex justify-between items-start'>
                                        <h4 className='text-sm sm:text-base font-semibold text-zinc-800 line-clamp-1'>
                                            {product.name}
                                        </h4>

                                        <span className='text-[10px] sm:text-xs text-gray-500'>
                                            {product.adddate}
                                        </span>
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

                                        {/* Button */}
                                        <button
                                            className='bg-blue-500 px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm text-white'
                                            onClick={() => addToCart(product)}
                                        >
                                            Add
                                        </button>

                                    </div>
                                </div>

                            </div>
                        ))
                    )
                }

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
                    className='bg-blue-600 text-white py-2 flex-1 rounded text-sm sm:text-base'
                    onClick={clearwish}
                >
                    Clear All
                </button>
            </div>

        </div>
    )
}

export default Wishlist