const userModel = require("../models/userModel");



const login = async(userLogin) => {
    return await userModel.login(userLogin);
};

module.exports = {
    login
}