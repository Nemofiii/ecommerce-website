import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;   // get access token from cookie

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);  // check if access token is valid
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;  // attach user object to request

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {  // check if access token is expired
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {   // check if user is admin
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};