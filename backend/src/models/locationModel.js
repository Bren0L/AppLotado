const connection = require("./connection");

const getAll = async() => {
    const [ location ] = await connection.execute("SELECT * FROM Location");
    return location;
};

const createLocation = async(userLocation) => {
    console.log(userLocation);
    const [ createdLocation ] = await connection.execute("INSERT INTO Location(userId, latitude, longitude, lastUpdate) VALUES (?, ?, ?, ?)", 
    [
        userLocation.userId,
        userLocation.latitude,
        userLocation.longitude,
        new Date(Date.now())
    ]);
    return {insertId: createdLocation.insertId};
};

const deleteLocation = async(userId) => {
    const [ deletedLocation ] = await connection.execute("DELETE FROM Location WHERE userId=?", [userId]);

    return deletedLocation;
};

const updateLocation = async(id, location) => {
    const { latitude, longitude} = location;
    const [ updatedLocation ] = await connection.execute("UPDATE Location SET latitude=?, longitude=?, lastUpdate=? WHERE userId=?", 
    [latitude, longitude, new Date(Date.now()), id]
    );

    return updatedLocation;
}

module.exports = {
    getAll,
    createLocation,
    deleteLocation,
    updateLocation
};