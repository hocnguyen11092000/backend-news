const express = require("express");
const app = express();
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const cloudinary = require("cloudinary");
dotenv.config({ path: ".env" });
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET,
});

// routers
const UserRouter = require("./routes/userRoute.js");
const CategoryRouter = require("./routes/categoryRoute.js");
const PostRouter = require("./routes/postRoute.js");
const CommentRouter = require("./routes/commentRoute.js");
const LikeRouter = require("./routes/likeRoute.js");
const NotificationRouter = require("./routes/notificationRoute");

app.use(cors());
app.use("/api/users", UserRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/posts", PostRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/likes", LikeRouter);
app.use("/api/notifications", NotificationRouter);

app.use("/", (req, res) => {
  res.send({ message: "hello word" });
});

//error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`backend server running on port ${PORT}`);
});
