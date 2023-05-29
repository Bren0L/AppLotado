const connection = require("./connection");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { ref, onChildChanged } = require("firebase/database");
const controller = require("../controller/locationController");

const auth = async(logIn) => {
    const { email, password } = logIn;
    
    return signInWithEmailAndPassword(connection.auth, email, password)
    .then((userCredential) => {
        const { uid } = userCredential.user;
        
        return { userId: uid };
    })
    .catch((error) => {
        return error;
    });

}

const getAll = (callback) => {
    const dbRef = ref(connection.realtimeDatabase, 'users/');
        
    onChildChanged(dbRef, (snapshot) => {
        const coords = snapshot.val();
            
        callback(coords);
    });
};

const getLocation = (callback) => {
    const dbRef = ref(connection.realtimeDatabase, 'users/');
        
    onChildChanged(dbRef, (snapshot) => {
        const coords = snapshot.val();
            
        callback(coords);
    });
}

const handleLocation = (coords) => {
    return coords;
}


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
    updateLocation,
    auth
};