import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import MainLayout from './Layouts/MainLayout';
import AdminLayout from './Layouts/AdminLayout';
import Admin from './Pages/Admin/Admin';
import Verify from "./Pages/Verify/Verify";
import MyOrder from "./Pages/MyOrder/MyOrder";
import Ordersummary from "./Pages/Ordersummary/Ordersummary";

const App = () => {

  const url = "http://localhost:5000";

  return (
    <>
      <Routes>

        {/* WITH NAVBAR */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* WITHOUT NAVBAR */}
        <Route path="/ordersummary" element={<Ordersummary />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorder" element={<MyOrder />} />

        {/* ADMIN */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/*" element={<Admin url={url} />} />
        </Route>

      </Routes>
    </>
  );
};

export default App;