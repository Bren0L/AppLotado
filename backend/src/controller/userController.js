const userModel = require("../models/userModel");



const login = async(login) => {
    const authentified = await userModel.login(login);
    
    return authentified;
};

module.exports = {
    login
}