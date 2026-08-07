import { Routes, Route, Link } from "react-router-dom";
import Add from "../../Components/Add/Add";
import List from "../../Components/List/List";
import Order from "../../Components/Order/Order";

const Admin = ({ url }) => {
  return (
    <div className="px-3 sm:px-5 md:px-8">

      {/* Admin Navbar */}
      <div className="
        flex flex-row flex-wrap 
        gap-2 sm:gap-4 
        mb-5 
        justify-center
      ">

        <Link to="/admin/add">
          <button className="
            bg-green-400 text-white font-semibold 
            px-4 sm:px-6 md:px-10 py-2 
            rounded-xl sm:rounded-2xl
            text-sm sm:text-base
          ">
            Add
          </button>
        </Link>

        <Link to="/admin/list">
          <button className="
            bg-zinc-400 text-white font-semibold 
            px-4 sm:px-6 md:px-10 py-2 
            rounded-xl sm:rounded-2xl
            text-sm sm:text-base
          ">
            List
          </button>
        </Link>

        <Link to="/admin/orders">
          <button className="
            bg-red-400 text-white font-semibold 
            px-4 sm:px-6 md:px-10 py-2 
            rounded-xl sm:rounded-2xl
            text-sm sm:text-base
          ">
            Orders
          </button>
        </Link>

      </div>

      {/* Routes */}
      <div className="w-full">
        <Routes>
          <Route path="add" element={<Add url={url} />} />
          <Route path="list" element={<List url={url} />} />
          <Route path="orders" element={<Order url={url} />} />
        </Routes>
      </div>

    </div>
  );
};

export default Admin;