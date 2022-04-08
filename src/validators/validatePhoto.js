import  createError from "http-errors"



export const validatePicture = (req,res,next)=>{
 
    console.log(req);
    if(!req.body.avatar){
        next(createError(400, "Picture must be include ++--"))
      }else{
    
        next()
        
      }
}