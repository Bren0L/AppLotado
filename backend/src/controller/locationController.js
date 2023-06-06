const locationModel = require("../models/locationModel");

const auth = async(login) => {
    
    const authentified = await locationModel.auth(login);
    
    return authentified;
};

const getBusesLocation = async(callback) => {
    locationModel.getBusesLocation(coords => {
        console.log("controller coords: ", coords);
        callback(coords);
    });
};

const sendLocation = (user, lat, long) => {
    locationModel.sendLocation(user, lat, long);
}

const stopSendingLocation = (user) => {
    locationModel.stopSendingLocation(user);
}

const createLocation = async(req, res) => {
    const createdLocation = await locationModel.createLocation(req.body);
    
    return res.status(201).json(createdLocation);
};

const deleteLocation = async(req, res) => {
    const { id } = req.params;
    await locationModel.deleteLocation(id);

    return res.status(204).json();
};

const updateLocation = async(req, res) => {
    const { id } = req.params;
    await locationModel.updateLocation(id, req.body);

    return res.status(204).json();
}

module.exports = {
    getBusesLocation,
    stopSendingLocation,
    sendLocation,
    createLocation,
    deleteLocation,
    updateLocation,
    auth
};