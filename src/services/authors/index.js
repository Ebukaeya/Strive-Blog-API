import express from "express";
import uniqid from "uniqid";
import { dirname, join } from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { validatePicture } from "../../validators/validatePhoto.js";
import multer from "multer"
const upload = multer(/* { dest: join(process.cwd(), "./src/files") } */)
/* const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); */




console.log(process.env.PORT);

const authorsRouter = express.Router();

/* get book url to read and write */

let authorPath = join(dirname(fileURLToPath(import.meta.url)), "authors.json");
let readAuthors = () => {
  let authors = JSON.parse(fs.readFileSync(authorPath));
  return authors;
};

let writeAuthors = (newauthor) => {
  let authors = readAuthors();
  authors.push(newauthor);
  fs.writeFileSync(authorPath, JSON.stringify(authors));
};

authorsRouter.get("/", (req, res) => {
  let authors = readAuthors();

  res.send(authors);
});

authorsRouter.get("/:authorID", (req, res) => {
  let author = readAuthors().find(
    (author) => author.ID === req.params.authorID
  );
  res.send(author);
});

authorsRouter.post("/", /* validatePicture, */ upload.single("avatar"), (req, res) => {
  console.log("route enter");
  console.log(req.file.buffer);
  let newAuthor = { ...req.body, createdAt: new Date(), ID: uniqid() };
  writeAuthors(newAuthor);
  res.send(newAuthor.ID);
  
});

export default authorsRouter;
