const connection = require("./connection");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { ref, onChildChanged, set, remove } = require("firebase/database");



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
};

const getBusesLocation = (callback) => {
    const dbRef = ref(connection.realtimeDatabase, 'users/');
        
    onChildChanged(dbRef, (snapshot) => {
        const coords = snapshot.val();
            
        callback(coords);
    });
};

const stopSendingLocation = (user) => {
    const dbRef = ref(connection.realtimeDatabase, 'users/'+user);

    remove(dbRef);
};

const sendLocation = (data) => {
    const { user, lat, long } = data;
    const dbRef = ref(connection.realtimeDatabase, "users/"+user);

    set(dbRef, {latitude: lat, longitude: long}).then(() => console.log('data set at: ', new Date(Date.now()).toLocaleTimeString()));
};



module.exports = {
    getBusesLocation,
    stopSendingLocation,
    sendLocation,
    auth
};