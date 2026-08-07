import { IoSearch } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/Storecontext";

const Navbar = ({ setshowlogin }) => {

  const {
    handlescroll,
    token,
    settoken,
    setsearchterm,
    isScrolled,
    handlepannel,
    totalItems,
    wishlist
  } = useContext(StoreContext);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md ${isScrolled ? "shadow-lg" : ""}`}>
        
        <nav className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 h-[12vh] flex items-center justify-between">

          {/* ✅ Logo */}
          <a href="#" className="flex w-10 h-10 sm:w-12 sm:h-12 bg-zinc-100 rounded-full p-2 shrink-0">
            <img src={assets.logo} alt="logo" className="w-full h-full object-contain" />
          </a>

          {/* ✅ Actions */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Wishlist */}
            <button
              className="text-xl sm:text-2xl text-zinc-800 relative"
              onClick={() => handlepannel("wishlist")}
            >
              <GoHeartFill />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white w-4 h-4 text-[10px] flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              className="text-xl sm:text-2xl text-zinc-800 relative"
              onClick={() => handlepannel("cart")}
            >
              <HiShoppingBag />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white w-4 h-4 text-[10px] flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Sign In / Profile */}
            {!token ? (
              <button
                className="hidden sm:flex h-[4vh] px-3 items-center border-2 border-blue-600 text-zinc-500 rounded-full hover:bg-blue-600 hover:text-white transition"
                onClick={() => setshowlogin(true)}
              >
                Sign In
              </button>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setShowProfileDropdown(true)}
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <CgProfile className="text-xl sm:text-2xl cursor-pointer" />

                {showProfileDropdown && (
                  <ul className="absolute right-0 w-24 bg-white border rounded shadow-lg">
                    <li
                      className="px-3 py-2 text-sm cursor-pointer hover:text-red-600"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            )}

            {/* ✅ Search (hidden on very small screens) */}
            <div className="hidden sm:flex items-center border-2 border-blue-600 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className="h-[4vh] px-3 text-sm outline-none"
                onFocus={handlescroll}
                onChange={(e) => setsearchterm(e.target.value)}
              />
              <button className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center">
                <IoSearch />
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* Spacer */}
      <div className="h-[12vh]"></div>
    </>
  );
};

export default Navbar;