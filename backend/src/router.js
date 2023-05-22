const express = require("express");
const locationController = require("./controller/locationController");

const router = express.Router();
const locationMiddleware = require("./middlewares/locationMiddleware");

router.get("/", locationController.getAll);
router.post("/", locationMiddleware.validateUserId, locationController.createLocation);
router.delete("/:id", locationController.deleteLocation);
router.put("/:id", locationMiddleware.validateLocation, locationController.updateLocation);

module.exports = router;