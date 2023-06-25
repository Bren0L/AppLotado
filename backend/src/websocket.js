const { io } = require("./http");
const locationcontroller = require("./controller/locationController");
const userController = require("./controller/userController");



io.on("connection", (socket) => {
    console.log("Hello ", socket.id);

    socket.on("disconnect", () => console.log(socket.id, " disconnected"));

    socket.on("message", message => socket.emit("return", message));

    socket.on("login", async(arg, callback) => {
        const firebaseLogin = await userController.login(arg);

        if(firebaseLogin.code){
            console.log("Error code: ", firebaseLogin);
            callback(false);
        }else{
            console.log("Access granted");
            callback(firebaseLogin);
        }
    })

    socket.on("sendLocation", data => locationcontroller.sendLocation(data));

    socket.on("stopSendingLocation", user => {
        locationcontroller.stopSendingLocation(user);

        io.emit("locationStopped", "stopped");
    });
    

    socket.on("getBusesLocation", () => {
        locationcontroller.getBusesLocation(buses => {
            //console.log(buses);
            
            socket.emit("busesLocation", buses);
        });
    });

    socket.on("offBusBroken", user => locationcontroller.offBusBroken(user));
    
});

