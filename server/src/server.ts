import express from "express";
import router from "./router";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use("/", router);

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
