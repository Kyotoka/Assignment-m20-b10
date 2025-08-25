import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, phoneNumber });
    const token = generateToken(user._id);

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json(user);
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        res.cookie("token", token, { httpOnly: true });
        res.json(user);
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

export const getProfile = (req, res) => {
    res.json(req.user);
};

export const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    await user.save();
    res.json(user);
};
