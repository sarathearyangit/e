import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../Context/Storecontext'

const Verify = () => {

  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const navigate = useNavigate()
  const { url, setcart } = useContext(StoreContext)

  const [status, setStatus] = useState("verifying")
  const [amount, setAmount] = useState(0)

  const verifyPay = async () => {

    if (!success || !orderId) {
      navigate("/")
      return
    }

    try {
      const response = await axios.post(
        url + '/api/order/verify',
        { success, orderId }
      )

      if (response.data.success) {

        setcart([]); // ✅ clear UI
        localStorage.removeItem("cart"); // ✅ clear storage

        setStatus("success")
        if (response.data.amount) {
          setAmount(response.data.amount);
        }

        setTimeout(() => {
          navigate('/myorder')
        }, 6000)

      } else {
        setStatus("failed")

        setTimeout(() => {
          navigate('/')
        }, 6000)
      }

    } catch (error) {
      console.log(error)
      setStatus("failed")
    }
  }

  // ✅ CORRECT PLACE
  useEffect(() => {
    const savedAmount = localStorage.getItem("orderAmount");

    if (savedAmount) {
      setAmount(Number(savedAmount));
    }

    verifyPay();
  }, []);

  return (
    <section className="flex justify-center items-center bg-black/95 fixed inset-0 z-40 px-3 sm:px-4">

      <div className="bg-zinc-100 rounded-lg p-5 sm:p-7 md:p-8 border border-zinc-300 w-full max-w-sm sm:max-w-md md:max-w-xl text-center">

        {/* VERIFYING */}
        {status === "verifying" && (
          <>
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
              Verifying Payment...
            </h1>
          </>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-4">
              Payment Successful ✅
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-zinc-800 mb-2">
              Amount Received: ₹{amount}
            </p>

            <p className="text-sm sm:text-base text-zinc-700">
              Redirecting to your orders...
            </p>
          </>
        )}

        {/* FAILED */}
        {status === "failed" && (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-4">
              Payment Failed ❌
            </h1>

            <p className="text-sm sm:text-base text-zinc-700">
              Redirecting to home...
            </p>
          </>
        )}

      </div>

    </section>
  )
}

export default Verify