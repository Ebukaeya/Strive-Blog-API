


export const pictureValidationError = (err,req,res,next)=>{
    console.log("i was reached", err.status);
    if (err.status===400){
        res.status(400).send(err.message)
    }
}


const genericError = (err,req,res,next)=>{
    console.log(err)
    res.status(500).send({message: err.message})
}

export default genericError