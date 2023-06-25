const { io } = require("./http");
const locationcontroller = require("./controller/locationController");
const userController = require("./controller/userController");



io.on("connection", (socket) => {
    console.log("Hello ", socket.id);

    socket.on("disconnect", () => console.log(socket.id, " disconnected"));

    socket.on("message", message => socket.emit("return", message));

    socket.on("login", async(userLogin, callback) => {
        callback(await userController.login(userLogin));
    })

    socket.on("sendLocation", data => locationcontroller.sendLocation(data));

    socket.on("stopSendingLocation", user => {
        locationcontroller.stopSendingLocation(user);

        io.emit("locationStopped", "stopped");
    });
    

    socket.on("getBusesLocation", () => locationcontroller.getBusesLocation(buses => socket.emit("busesLocation", buses)));

    socket.on("offBusBroken", user => locationcontroller.offBusBroken(user));
    
});

