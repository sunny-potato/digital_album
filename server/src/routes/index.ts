import express from "express";
import cors from "cors";
import userRouter from "./user.route";
import signupRouter from "./signup.route";
import loginRouter from "./login.route";
import myalbumRouter from "./myAlbum.route";
import folderRouter from "./albumFolder.route";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use("/user", userRouter);
server.use("/signup", signupRouter);
server.use("/login", loginRouter);
server.use("/myAlbum", myalbumRouter);
server.use("/albumFolder", folderRouter);

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
