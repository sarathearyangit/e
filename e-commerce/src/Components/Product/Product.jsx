import { GoHeartFill } from "react-icons/go";
import { useContext, useState } from "react";
import { StoreContext } from "../../Context/Storecontext";

const Product = () => {
  const {
    searchterm = "",
    addToCart,
    addtowish,
    item_list = [],
    url,
    wishlist = []
  } = useContext(StoreContext);

  const [activetab, setactivetab] = useState("All");

  const categories = ["All", "Mens", "Womens", "Kids", "New Arrivals", "On Sale"];

  const filterItems = item_list.filter((item) => {
    // 🔹 CATEGORY FILTER
    let matchcategory = true;

    if (
      activetab === "Mens" ||
      activetab === "Womens" ||
      activetab === "Kids"
    ) {
      matchcategory =
        item.category.toLowerCase() === activetab.toLowerCase();
    }

    // 🔹 SPECIAL FILTER
    let matchSpecial = true;

    if (activetab === "New Arrivals") {
      matchSpecial = item.newArrival === true;
    }

    if (activetab === "On Sale") {
      matchSpecial = item.onSale === true;
    }

    // 🔹 SEARCH FILTER
    const matchsearch = item.name
      .toLowerCase()
      .includes(searchterm.toLowerCase());

    return matchcategory && matchSpecial && matchsearch;
  });

  return (
    <section
      id="product-section"
      className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 py-8"
    >
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`cursor-pointer rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base ${
              activetab === category
                ? "bg-blue-600 text-white"
                : "bg-zinc-200"
            }`}
            onClick={() => setactivetab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
        {filterItems.length === 0 ? (
          <p className="text-sm sm:text-lg text-center text-zinc-800 col-span-full bg-zinc-100 px-4 py-2 rounded-full">
            No product found
          </p>
        ) : (
          filterItems.map((product) => (
            <div
              key={product._id}
              className="bg-zinc-200 p-3 sm:p-4 border border-zinc-300 rounded-lg"
            >
              {/* Wishlist & Badge */}
              <div className="flex justify-between items-center">
                <button
                  className={`text-xl sm:text-3xl ${
                    wishlist.some((item) => item._id === product._id)
                      ? "text-red-600"
                      : "text-zinc-400"
                  }`}
                  onClick={() => addtowish(product)}
                >
                  <GoHeartFill />
                </button>

                {(product.onSale || product.newArrival) && (
                  <span
                    className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm text-white ${
                      product.onSale ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {product.onSale ? "Sale" : "New"}
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="w-full h-36 sm:h-48 md:h-56 flex justify-center items-center mt-3">
                <img
                  src={url + "/images/" + product.image}
                  alt={product.name}
                  className="object-contain max-h-full"
                />
              </div>

              {/* Product Details */}
              <div className="text-center mt-3 sm:mt-4">
                <h3 className="text-sm sm:text-lg font-semibold line-clamp-2">
                  {product.name}
                </h3>

                <div className="mt-1 mb-2 sm:mb-3">
                  {/* Old Price */}
                  {product.onSale && product.oldprice && (
                    <span className="text-zinc-500 text-sm sm:text-base line-through mr-2 sm:mr-4">
                      ₹{product.oldprice.toFixed(2)}
                    </span>
                  )}

                  {/* Current Price */}
                  <span className="text-red-600 text-sm sm:text-base font-semibold">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="bg-blue-600 text-white py-1.5 sm:py-2 w-full rounded-lg text-sm sm:text-base active:bg-blue-700"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Product;