//const { socket, httpServer} = require("./server");
const app = require("./app");
const socketIo = require("socket.io");
const http = require("http");
const locationController = require("./controller/locationController");
//const router = app.Router();
const locationMiddleware = require("./middlewares/locationMiddleware");

const httpServer = http.createServer(app);
const socket = new socketIo.Server(httpServer);

socket.on("connection", (user) => {
    console.log("Hello ", user.id);
});

/*router.get("/location", locationController.getAll);
router.post("/", locationMiddleware.validateUserId, locationController.createLocation);
router.delete("/:id", locationController.deleteLocation);
router.put("/:id", locationMiddleware.validateLocation, locationController.updateLocation);
router.post("/login", locationController.auth);*/

module.exports = socket;