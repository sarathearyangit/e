import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    let userData = await userModel.findById(userId);

    let cartData = userData.cartData || {};

    if (!productId) {
      return res.json({ success: false, message: "No productId" });
    }

    if (cartData[productId]) {
      cartData[productId] += 1;
    } else {
      cartData[productId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// REMOVE ITEM
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[productId] > 1) {
      cartData[productId] -= 1;   //  decrease
    } else {
      delete cartData[productId]; //  remove if 1
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// GET CART
const getcart = async (req, res) => {
    try {

        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            cartData: user.cartData
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getcart };