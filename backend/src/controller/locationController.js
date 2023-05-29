const locationModel = require("../models/locationModel");

const auth = async(login) => {
    
    const authentified = await locationModel.auth(login);
    
    return authentified;
};

const getAll = async() => {
    try {
        let coordinates;
        locationModel.getAll(coords => {
            coordinates = coords;
            return coordinates;
            console.log(coordinates);
        });
        console.log(coordinates);
        return coordinates;
    } catch(error){
        console.error(error);
    }
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
    updateLocation,
    auth
};