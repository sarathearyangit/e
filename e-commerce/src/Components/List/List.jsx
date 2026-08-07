import { useEffect, useState } from 'react'
import axios from 'axios'

const List = ({ url }) => {

  const [list, setlist] = useState([])

  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/item/list`)
    console.log(response.data)
    if (response.data.success) {
      setlist(response.data.data)
    } else {
      console.log('error')
    }
  }

  const removeitem = async (itemId) => {
    const response = await axios.post(`${url}/api/item/remove`, { _id: itemId })

    if (response.data.success) {
      await fetchlist()
    }
  }

  useEffect(() => {
    fetchlist()
  }, [])

  return (
    <div className='px-4 sm:px-6 w-full'>

      <p className='text-2xl font-semibold my-6 text-center'>All Foods List</p>

      <div className='w-full max-w-6xl mx-auto border-2 border-zinc-500 rounded-lg overflow-hidden mb-7'>

        {/* header (hidden on mobile) */}
        <div className='hidden sm:grid grid-cols-5 bg-gray-200 py-4 text-center font-semibold'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* data rows */}
        {list.map((item, index) => (

          // 🔹 MOBILE CARD + DESKTOP ROW
          <div
            key={index}
            className='
        flex flex-col gap-2 p-3 border-t border-zinc-400
        sm:grid sm:grid-cols-5 sm:text-center sm:items-center
      '
          >

            {/* Image */}
            <div className='flex justify-between sm:justify-center'>
              <span className='sm:hidden font-semibold'>Image:</span>
              <img
                src={`${url}/images/` + item.image}
                alt=""
                className='w-12 h-12 rounded-lg'
              />
            </div>

            {/* Name */}
            <p className='flex justify-between sm:justify-center'>
              <span className='sm:hidden font-semibold'>Name:</span>
              {item.name}
            </p>

            {/* Category */}
            <p className='flex justify-between sm:justify-center'>
              <span className='sm:hidden font-semibold'>Category:</span>
              {item.category}
            </p>

            {/* Price */}
            <p className='flex justify-between sm:justify-center'>
              <span className='sm:hidden font-semibold'>Price:</span>
              ₹{item.price}
            </p>

            {/* Action */}
            <button
              className='flex justify-between sm:justify-center text-red-500 font-bold hover:scale-110 transition cursor-pointer'
              onClick={() => {
                console.log(item._id)
                removeitem(item._id)
              }}
            >
              <span className='sm:hidden font-semibold'>Action:</span>
              X
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default List