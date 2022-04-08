import express from "express";
import authorsRouter from "./services/authors/index.js"
import genericError from "./errorHandlers/index.js";
import { pictureValidationError } from "./errorHandlers/index.js";
import listEndpoints from "express-list-endpoints"


const app = express()
app.use(express.json())
app.use("/authors", authorsRouter)
app.use(pictureValidationError)
app.use(genericError)




app.listen(3000, ()=>{
    console.table(listEndpoints(app))
    console.log("listing at port 3000")
})