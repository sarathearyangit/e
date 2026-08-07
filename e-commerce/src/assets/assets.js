import baby from './baby-shirt.png'
import dress from './dress.png'
import hoodie from './hoodie.png'
import jeans from './jeans.png'
import leather from './leather-jacket.png'
import shirtdress from './shirt-dress.png'
import longsleeve from './shirt.png'
import skater from './skater.png'
import skirt from './skirt.png'
import sleepsuit from './sleepsuit.png'
import sweater from './sweater.png'
import tshirt from './tshirt.png'

import banner from './banner.jpg'
import logo from './logo.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    banner,
    parcel_icon
}


export const item_list = [
    {
        _id: 1,
        name: "Sports T-Shirt",
        image: tshirt,
        price: 200,
        oldprice: 350.99,
        onSale: true,
        newArrival: false,
        category: "Mens",
    },
    {
        _id: 2,
        name: "Slim Fit Jeans",
        image: jeans,
        price: 660,
        oldprice: 99.99,
        onSale: false,
        newArrival: true,
        category: "Mens",
    },
    {
        _id: 3,
        name: "Leather Jacket",
        image: leather,
        price: 99.00,
        oldprice: 165.00,
        onSale: true,
        newArrival: false,
        category: "Mens",
    },
    {
        _id: 4,
        name: "Skater Dress",
        image: skater,
        price: 40,
        oldprice: 45.99,
        onSale: true,
        newArrival: false,
        category: "Womens",
    },
    {
        _id: 5,
        name: "Baby Sleepsuit",
        image: sleepsuit,
        price: 29,
        oldprice: null,
        onSale: false,
        newArrival: true,
        category: "Kids",
    },
    {
        _id: 6,
        name: "Full sleeepes Shirt",
        image: dress,
        price: 125.00,
        oldprice: null,
        onSale: false,
        newArrival: true,
        category: "Womens",
    },
    {
        _id: 7,
        name: "Stripes Sweater",
        image: sweater,
        price: 65.00,
        oldprice: 85.99,
        onSale: true,
        newArrival: false,
        category: "Kids",
    },
    {
        _id: 8,
        name: "Pink Skirt",
        image: skirt,
        price: 35.00,
        oldprice: 45.99,
        onSale: false,
        newArrival: true,
        category: "Womens",
    },
    {
        _id: 9,
        name: "Baby Shirt",
        image: baby,
        price: 30.00,
        oldprice: null,
        onSale: false,
        newArrival: true,
        category: "Kids",
    },
    {
        _id: 10,
        name: "Hoodie",
        image: hoodie,
        price: 35.00,
        oldprice: 45.00,
        onSale: false,
        newArrival: true,
        category: "Mens",
    },
    {
        _id: 11,
        name: "Full Sleeve Shirt",
        image: shirtdress,
        price: 99,
        oldprice: 116.99,
        onSale: true,
        newArrival: false,
        category: "Womens",
    },
    {
        _id: 12,
        name: "Florval dress",
        image: shirtdress,
        price: 99,
        oldprice: 116.99,
        onSale: true,
        newArrival: false,
        category: "Kids",
    },
]



export const url = "https://e-backened.onrender.com"
