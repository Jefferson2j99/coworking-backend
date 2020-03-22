const express = require('express');

const CompanyController = require('./controller/CompanyController');
const SpotController = require('./controller/SpotController');

const routes = express.Router();

routes.post('/company', CompanyController.store);
routes.post('/login', CompanyController.login);
routes.get('/company/:id', CompanyController.index);

routes.post('/spot', SpotController.store);

module.exports = routes;