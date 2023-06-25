const connection = require("./connection");
const { signInWithEmailAndPassword } = require("firebase/auth");



const login = async(userLogin) => {
    const { email, password } = userLogin;
    
    return await signInWithEmailAndPassword(connection.auth, email, password)
        .then((userCredential) => {
            const { uid } = userCredential.user;
        
            return { userId: uid };
        }).catch((error) => {
            console.error(error);
        });
};

module.exports = {
    login
}