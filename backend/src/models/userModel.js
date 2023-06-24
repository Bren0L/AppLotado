const connection = require("./connection");
const { signInWithEmailAndPassword } = require("firebase/auth");



const login = async(login) => {
    const { email, password } = login;
    
    return await signInWithEmailAndPassword(connection.auth, email, password)
    .then((userCredential) => {
        const { uid } = userCredential.user;
        
        return { userId: uid };
    })
    .catch((error) => {
        return error;
    });
};

module.exports = {
    login
}