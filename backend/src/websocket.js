const { io } = require("./http");
const controller = require("./controller/locationController");




io.on("connection", (socket) => {
    console.log("Hello ", socket.id);

    socket.on("message", (message) => {
        socket.emit("return", message);
    });

    socket.on("login", async login => {
        const firebaseLogin = await controller.auth(login);

        if(firebaseLogin.code){
            socket.emit("wrongEorP");
        }else{
            const answer = { userId: firebaseLogin };
            socket.emit("answer", answer);
        }
        
    });
    

    socket.on("location", () => {
        const s = controller.getAll();
        console.log(s);
        socket.emit("sentLocation", s);
    });
});