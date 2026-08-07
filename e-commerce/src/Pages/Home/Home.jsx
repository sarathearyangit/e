import Product from '../../Components/Product/Product'
import Cart from '../../Components/Cart/Cart'
import Wishlist from '../../Components/Wishlist/Wishlist'
import Banner from '../../Components/Banner/Banner'   

const Home = () => {

  return (
    <div>
      <Banner />
      <Product />
      <Cart />
      <Wishlist />
    </div>
  )
}

export default Home