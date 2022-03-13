const express = require('express')
const { httpGetAllLaunches, httpAddLaunch } = require('./launches.controller')

const launchRouter = express.Router()

launchRouter.get('/', httpGetAllLaunches)
launchRouter.post('/', httpAddLaunch)

module.exports = launchRouter