import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing user order
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.userId,   // ✅ FIXED
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.userId, {
            cartData: {}
        });

        res.json({
            success: true,
            session_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};


// verify order
const verifyOrder = async (req, res) => {

    const { orderId, success } = req.body;

    try {

        if (success === "true" || success === true) {

            await orderModel.findByIdAndUpdate(orderId, { payment: true });

            res.json({
                success: true,
                message: "Payment Successful"
            });

        } else {

            await orderModel.findByIdAndDelete(orderId);

            res.json({
                success: false,
                message: "Payment Failed"
            });

        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


// user orders
const userOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({ userId: req.userId });

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


// admin orders
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ payment: true }); // ✅ only paid
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


// update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {
            status: req.body.status
        });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };