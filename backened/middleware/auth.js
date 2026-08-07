import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.json({ success: false, message: "Not logged in" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;   // 🔥 THIS IS IMPORTANT

        next();

    } catch (error) {
        res.json({ success: false, message: "Auth error" });
    }
};

export default authMiddleware;