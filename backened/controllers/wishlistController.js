import userModel from "../models/userModel.js";

// ✅ ADD
const addToWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        let userData = await userModel.findById(userId);

        let wishlistData = userData.wishlistData || {};

        wishlistData[productId] = true;

        await userModel.findByIdAndUpdate(userId, { wishlistData });

        res.json({ success: true });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};

// ✅ REMOVE
const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        let userData = await userModel.findById(userId);

        let wishlistData = userData.wishlistData || {};

        delete wishlistData[productId];

        await userModel.findByIdAndUpdate(userId, { wishlistData });

        res.json({ success: true });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};

// ✅ GET
const getWishlist = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            wishlistData: userData.wishlistData || {}
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export {addToWishlist, removeFromWishlist, getWishlist }