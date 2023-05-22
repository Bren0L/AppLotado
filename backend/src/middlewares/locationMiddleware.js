const validateUserId = (req, res, next) => {
    const { body: { userId } } = req;
    if(userId == null || userId == "" || userId == undefined){
        return res.status(400).json({message: "O campo userId esta incorreto"});
    }
    next();
};

const validateLocation = (req, res, next) => {
    const { body: { latitude, longitude } } = req;
    if(latitude == null || latitude == "" || latitude == undefined || typeof(latitude) != "number"){
        return res.status(400).json({message: "O campo latitude esta incorreto"});
    }
    if(longitude == null || longitude == "" || longitude == undefined || typeof(longitude) != "number"){
        return res.status(400).json({message: "O campo longitude esta incorreto"});
    }
    next();
}

module.exports = {
    validateUserId,
    validateLocation
}