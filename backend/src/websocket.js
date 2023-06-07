const { io } = require("./http");
const controller = require("./controller/locationController");



io.on("connection", (socket) => {
    console.log("Hello ", socket.id);

    socket.on("disconnect", () => console.log(socket.id, " disconnected"));

    socket.on("message", (message) => socket.emit("return", message));

    socket.on("login", async login => {
        const firebaseLogin = await controller.auth(login);

        if(firebaseLogin.code){
            console.log("Error code: ", firebaseLogin);
            console.log("Access denied");
            socket.emit("wrongEorP", "wrong");
        }else{
            console.log("Access granted");
            const answer = firebaseLogin;
            socket.emit("answer", answer);
        }
    });

    socket.on("sendLocation", (data) => controller.sendLocation(data));

    socket.on("stopSendingLocation", (user) => {
        controller.stopSendingLocation(user);

        io.emit("locationStopped", "stopped");
    });
    

    socket.on("getBusesLocation", () => {
        controller.getBusesLocation(buses => {
            console.log(buses);
            
            socket.emit("busesLocation", buses);
        });
    });

    socket.on("offBusBroken", user => controller.offBusBroken(user));
    
});

