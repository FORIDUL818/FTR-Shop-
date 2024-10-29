const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
class UserController {
    // Registration method
    async register(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;

            // Check if the user already exists
            const userExists = await userModel.findOne({ email });
            if (userExists) {
                return res.status(400).json({ status: "error", message: "Your email is already in use" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the new user
            const userData = await userModel.create({ firstName, lastName, email, password: hashedPassword });
            return res.status(200).json({ status: "success", data: userData });

        } catch (error) {
            return res.status(500).json({ status: "fail", message: error.message });
        }
    }

    // Login method
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Check if user exists with the provided email
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ status: "error", message: "Invalid email or password" });
            }

            // Compare provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ status: "error", message: "Invalid email or password" });
            }

            // Successful login
            let payload = { exp: Math.floor(Date.now() / 1000) + (60 * 60*24), data:email };
            let token = jwt.sign(payload, process.env.JWT_SECRET);
            return res.status(200).json({ status: "success", data: userData, Token: token});
        } catch (error) {
            // Handle unexpected errors
            return res.status(500).json({ status: "fail", message: error.message });
        }
    }
}

// Instantiate controller methods
const userController = new UserController();
const registration = userController.register.bind(userController);
const login = userController.login.bind(userController);

// userDetails satart
 const userDetails=async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(401).json({status:"fail",data:error})
    }
 }
// userDetails end

module.exports = {
    registration,
    login
};

