const errorHandler = (err,req,res,next)=>{
    console.error("server error ",err)
    res.status(500).json({
        success:false,
        message:err.message
    })
}
module.exports = errorHandler;