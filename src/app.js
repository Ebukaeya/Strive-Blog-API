import express from "express";
import authorsRouter from "./services/authors/index.js"


const app = express()
app.use(express.json())
app.use("/authors", authorsRouter)




app.listen(3000, ()=>{
    console.log("listing at port 3000")
})