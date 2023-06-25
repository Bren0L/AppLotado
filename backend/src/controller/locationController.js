const locationModel = require("../models/locationModel");



const getBusesLocation = (callback) => {
    locationModel.getBusesLocation(buses => {

        callback(buses);
    });
};

const offBusBroken = (user) => {
    locationModel.offBusBroken(user);
};

const sendLocation = (data) => {
    locationModel.sendLocation(data);
};

const stopSendingLocation = (user) => {
    locationModel.stopSendingLocation(user);
};



module.exports = {
    getBusesLocation,
    offBusBroken,
    stopSendingLocation,
    sendLocation
};