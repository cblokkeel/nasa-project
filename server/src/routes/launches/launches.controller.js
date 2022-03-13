const { getAllLaunches, addNewLaunch, abortLaunch, existsLaunchWithId } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddLaunch(req, res) {
    const launch = req.body

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({error: 'missing data'})
    }
    
    launch.launchDate = new Date(launch.launchDate)
    if (launch.launchDate.toString() === 'Invalid Date') {
        return res.status(400).json({error: 'invalid launch date'})
    }
    
    addNewLaunch(launch)

    return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
    const launchId = +req.params.id

    // if launch doesnt exist
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({ error: 'launch doesnt exist' })
    }

    const aborted = abortLaunch(launchId)

    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddLaunch,
    httpAbortLaunch
}