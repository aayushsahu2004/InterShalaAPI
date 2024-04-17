exports.genetatedErrors = (err, req, res, next) =>{
    const stutasCode = err.stutasCode || 500;

    if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")){
        err.message = "User with this email address already exist"
    }

    res.status(stutasCode).json({
        message: err.message,
        errName: err.name,
    });
}