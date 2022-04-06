import express from "express";
import uniqid from "uniqid";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

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
  console.log(authors);

  fs.writeFileSync(authorPath, JSON.stringify(authors));
};
/* writeAuthors({
    name: "Ebukaa",
    surname:"Eya6",
    ID: uniqid(),
    email: "eyaebuka@gmailbb.com",
    dob:"22-11-92",
    avarter: ""
})

 */

/* writeAuthors(...readAuthors(),{
    name: "Ebuka1",
    surname:"Eya4",
    ID: uniqid(),
    email: "eyaebuka@gmailbb.com",
    dob:"22-11-92",
    avarter: ""
}) */

authorsRouter.get("/", (req, res) => {
  let authors = readAuthors();
  console.log(authors);

  res.send(authors);
});

authorsRouter.get("/:authorID", (req, res) => {
  let author = readAuthors().find(
    (author) => author.ID === req.params.authorID
  );
  res.send(author);
});

authorsRouter.post("/", (req, res) => {
  let newAuthor = {...req.body, createdAt:new Date(), ID: uniqid()};
  writeAuthors(newAuthor)
  res.send(newAuthor.ID);
});

export default authorsRouter;
