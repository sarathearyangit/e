import { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'

const Add = ({ url }) => {

    const [image, setimage] = useState(false)

    const [data, setdata] = useState({
        name: '',
        description: '',
        price: '',
        oldprice: '',
        category: 'Mens',
        newArrival: false,   // ✅ added
        onSale: false        // ✅ added
    })

    const onChangehandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setdata(prev => ({ ...prev, [name]: value }))
    }

    const onSubmithandler = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', Number(data.price))
        formData.append('oldprice', Number(data.oldprice))
        formData.append('category', data.category)
        formData.append('image', image)

        // ✅ IMPORTANT FIX
        formData.append('newArrival', data.newArrival)
        formData.append('onSale', data.onSale)

        const response = await axios.post(`${url}/api/item/add`, formData)

        if (response.data.success) {
            setdata({
                name: '',
                description: '',
                price: '',
                oldprice: '',
                category: 'Mens',
                newArrival: false,
                onSale: false
            })
            setimage(false)
        }
    }

    return (

        <div className='px-4 sm:px-6 w-full'>

            <form
                className='flex flex-col gap-5 w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow'
                onSubmit={onSubmithandler}
            >

                {/* Upload Image */}
                <div>
                    <p className='font-medium mb-2'>Upload Image</p>

                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt=""
                            className='w-28 sm:w-36 md:w-40 border border-zinc-400 rounded-lg p-2 cursor-pointer'
                        />
                    </label>

                    <input
                        onChange={(e) => setimage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                {/* Product Name */}
                <div>
                    <p className='font-medium mb-1'>Product Name</p>

                    <input
                        type="text"
                        name="name"
                        placeholder='Type here'
                        className='w-full border border-zinc-400 rounded-lg p-2 outline-none'
                        onChange={onChangehandler}
                        value={data.name}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <p className='font-medium mb-1'>Product Description</p>

                    <textarea
                        name="description"
                        rows="4"
                        placeholder='Write content here'
                        required
                        className='w-full border border-zinc-400 rounded-lg p-2 outline-none'
                        onChange={onChangehandler}
                        value={data.description}
                    ></textarea>
                </div>

                {/* Category + Price */}
                <div className='flex flex-col sm:flex-row gap-4'>

                    <div className='flex-1 border border-zinc-400 rounded-lg p-3'>
                        <p className='mb-1'>Product Category</p>

                        <select
                            name="category"
                            onChange={onChangehandler}
                            className='w-full outline-none'
                        >
                            <option value="Mens">Mens</option>
                            <option value="Womens">Womens</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>

                    <div className='flex-1 border border-zinc-400 rounded-lg p-3'>
                        <p className='mb-1'>Product Price</p>

                        <input
                            onChange={onChangehandler}
                            type="number"
                            name='price'
                            placeholder='₹20'
                            className='w-full outline-none'
                            value={data.price}
                            required
                        />
                    </div>

                    <div className='flex-1 border border-zinc-400 rounded-lg p-3'>
                        <p className='mb-1'>Old Price</p>

                        <input
                            onChange={onChangehandler}
                            type="number"
                            name='oldprice'
                            placeholder='₹20'
                            className='w-full outline-none'
                            value={data.oldprice}
                            required
                        />
                    </div>

                </div>

                {/* ✅ NEW ARRIVAL & ON SALE */}
                <div className='flex gap-6'>

                    <label className='flex items-center gap-2'>
                        <input
                            type="checkbox"
                            checked={data.newArrival}
                            onChange={(e) =>
                                setdata(prev => ({
                                    ...prev,
                                    newArrival: e.target.checked
                                }))
                            }
                        />
                        New Arrival
                    </label>

                    <label className='flex items-center gap-2'>
                        <input
                            type="checkbox"
                            checked={data.onSale}
                            onChange={(e) =>
                                setdata(prev => ({
                                    ...prev,
                                    onSale: e.target.checked
                                }))
                            }
                        />
                        On Sale
                    </label>

                </div>

                {/* Button */}
                <button
                    type='submit'
                    className='bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg w-full sm:w-40'
                >ADD
                </button>
            </form>

        </div>
    )
}

export default Add