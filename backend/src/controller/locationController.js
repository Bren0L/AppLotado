const locationModel = require("../models/locationModel");



const auth = async(login) => {
    const authentified = await locationModel.auth(login);
    
    return authentified;
};

const getBusesLocation = (callback) => {
    locationModel.getBusesLocation(coords => {
        console.log("controller coords: ", coords);

        callback(coords);
    });
};

const sendLocation = (data) => {
    locationModel.sendLocation(data);
};

const stopSendingLocation = (user) => {
    locationModel.stopSendingLocation(user);
};



module.exports = {
    getBusesLocation,
    stopSendingLocation,
    sendLocation,
    auth
};