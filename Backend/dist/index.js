"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const JWT_SECRET_KEY = 'AABA-DABBA-JABBA';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = yield db_1.User.findOne({ username });
    if (existingUser)
        res.status(409).json({ msg: "User pre exisits" });
    yield db_1.User.create({ username, password });
    res.status(200).json({ msg: "Signup Successful" });
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const exisitingUser = yield db_1.User.findOne({ username, password });
    if (exisitingUser) {
        const token = jsonwebtoken_1.default.sign({ id: exisitingUser._id }, JWT_SECRET_KEY);
        res.status(200).json({ msg: "SigninSuccessful", token });
    }
    else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    yield db_1.Content.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({ message: "Content added" });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId; // User ID is fetched from middleware
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result, 
    // and other details like password won’t be fetched.
    const content = yield db_1.Content.find({ userId: userId }).populate("userId", "username");
    res.json(content); // Send the content as response
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    //@ts-ignore
    yield db_1.Content.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" }); // Send success response.
}));
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
