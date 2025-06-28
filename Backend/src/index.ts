import express from "express";
import jwt from "jsonwebtoken";
import { Content, User } from './db';
import { userMiddleware } from "./middleware";

const JWT_SECRET_KEY = 'AABA-DABBA-JABBA';

const app = express();
app.use(express.json());

app.post('/api/v1/signup',async (req,res)=>{
  const {username, password} = req.body

  const existingUser  = await User.findOne({username});

  if(existingUser)res.status(409).json({msg:"User pre exisits"})

  await User.create({ username, password })

  res.status(200).json({msg:"Signup Successful"})
})

app.post('/api/v1/signin',async(req,res)=>{
  const {username, password} = req.body

  const exisitingUser = await User.findOne({username, password})

  if (exisitingUser) {
        const token = jwt.sign({ id: exisitingUser._id }, JWT_SECRET_KEY);
        res.status(200).json({ msg:"SigninSuccessful" ,token }); 
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }

})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;
    await Content.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId, 
        tags: [] 
    });

    res.json({ message: "Content added" }); 
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;  // User ID is fetched from middleware
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result, 
    // and other details like password won’t be fetched.
    const content = await Content.find({ userId: userId }).populate("userId", "username");
    res.json(content);  // Send the content as response
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    //@ts-ignore
    await Content.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" }); // Send success response.
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});