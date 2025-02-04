const express = require("express");
const app = express();
const { connection } = require("./database/db");
const Users = require("./model/userSchema");
const Categories = require("./model/categorySchema");
const Posts = require("./model/postSchema");
const FavouritePosts = require("./model/favouritePostSchema");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const authRouter = require("./routes/authRoute");
const categoryRouter = require("./routes/categoryRoute");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { authenticateToken } = require("./middleware/token-middleware");
dotenv.config();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(authenticateToken);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/category", categoryRouter);



app.listen(PORT, async () => {
    console.log(`server is running on ${PORT}`);
    try {
        // await connection.authenticate();
        console.log("Connection successful");

        // Ensure tables are created in the correct order
        await Users.sync();
        await Categories.sync();
        await Posts.sync();
        await FavouritePosts.sync();

        console.log("All tables have been created");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});

connection();