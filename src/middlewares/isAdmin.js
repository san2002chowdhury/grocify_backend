export const isAdmin = (req, res, next) => {
    try {
        if (req.userRole === "admin") {
            next();
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Admin access only!"
            })
        }
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}