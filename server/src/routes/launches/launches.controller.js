const { getAllLaunches, addNewLaunch } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddLaunch(req, res) {
    const launch = req.body

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
        return res.status(400).json({error: 'missing data'})
    }

    
    launch.launchDate = new Date(launch.launchDate)
    if (launch.launchDate.toString() === 'Invalid Date') {
        return res.status(400).json({error: 'invalid launch date'})
    }
    
    addNewLaunch(launch)

    return res.status(201).json(launch)
}

module.exports = {
    httpGetAllLaunches,
    httpAddLaunch
}