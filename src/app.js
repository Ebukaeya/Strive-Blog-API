import express from "express";
import authorsRouter from "./services/authors/index.js"
import genericError from "./errorHandlers/index.js";


const app = express()
app.use(express.json())
app.use("/authors", authorsRouter)
app.use(genericError)




app.listen(3000, ()=>{
    console.log("listing at port 3000")
})