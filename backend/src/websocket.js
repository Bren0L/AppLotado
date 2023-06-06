const { io } = require("./http");
const controller = require("./controller/locationController");



io.on("connection", (socket) => {
    console.log("Hello ", socket.id);

    socket.on("disconnect", () => console.log(socket.id, " disconnected"));

    socket.on("message", (message) => socket.emit("return", message));

    socket.on("login", async login => {
        const firebaseLogin = await controller.auth(login);

        if(firebaseLogin.code){
            socket.emit("wrongEorP");
        }else{
            const answer = firebaseLogin;
            socket.emit("answer", answer);
        }
    });

    socket.on("sendLocation", (data) => controller.sendLocation(data));

    socket.on("stopSendingLocation", (user) => {
        controller.stopSendingLocation(user);

        socket.emit("locationStopped", "stopped");
    });
    

    socket.on("location", () => {
        controller.getBusesLocation(coords => {
            console.log(coords);
            
            socket.emit("sentLocation", coords);
        });
    });
    
});