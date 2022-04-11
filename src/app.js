import express from "express";
import authorsRouter from "./services/authors/index.js"
import genericError from "./errorHandlers/index.js";
import { pictureValidationError } from "./errorHandlers/index.js";
import listEndpoints from "express-list-endpoints";
import cors from "cors"
import createError from "http-errors"


const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

const app = express()

app.use(
    cors({
      origin: (origin, next) => {
        // cors is a global middleware --> for each and every request we are going to be able to read the current origin value
        console.log("ORIGIN: ", origin)
  
        if (!origin || whitelist.indexOf(origin) !== -1) {
          // origin is in the whitelist --> move next with no errors
          next(null, true)
        } else {
          // origin is NOT in the whitelist --> trigger an error
          next(createError(400, "CORS ERROR!"))
        }
      },
    })
  )


app.use(express.json())
app.use("/authors", authorsRouter)
app.use(pictureValidationError)
app.use(genericError)




app.listen(3000, ()=>{
    console.table(listEndpoints(app))
    console.log("listing at port 3000")
})