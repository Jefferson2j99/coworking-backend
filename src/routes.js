const express = require("express");

const CompanyController = require("./controller/CompanyController");
const SpotController = require("./controller/SpotController");
const UserController = require("./controller/UserController");
const BookingController = require("./controller/BookingController");
const ApprovalController = require("./controller/ApprovalController");
const RejectionController = require("./controller/RejectionController");

const routes = express.Router();

// Routes of company
routes.post("/company", CompanyController.createCompany);
routes.post("/company/login", CompanyController.login);
routes.get("/company/:id", CompanyController.findCompanyById);

// Routes of spot
routes.post("/spot", SpotController.createSpot);
routes.get("/spot/:companyId", SpotController.findSpotsByCompanyId);

//Routes of user
routes.post("/user", UserController.createUser);
routes.post("/user/login", UserController.login);
routes.get("/companies/location", UserController.getCompaniesByLocation);
routes.get("/companies/:companyName", UserController.getCompaniesByName);

// Booking
routes.post("/spots/:spotId/bookings", BookingController.createBooking);
routes.post("/bookings/:bookingId/approvals", ApprovalController.store);
routes.post("/bookings/:bookingId/rejections", RejectionController.store);

module.exports = routes;
