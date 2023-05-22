const locationModel = require("../models/locationModel");

const getAll = async(_req, res) => {

    const location = await locationModel.getAll();

    return res.status(200).json(location);
};

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
    getAll,
    createLocation,
    deleteLocation,
    updateLocation
};