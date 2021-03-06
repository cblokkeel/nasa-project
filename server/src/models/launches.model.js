// const launches = require('./launches.mongo')

const launches = new Map()

let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

const existsLaunchWithId = id => launches.has(id)

const getAllLaunches = () => Array.from(launches.values())

const addNewLaunch = launch => {
    latestFlightNumber++
    launches.set(latestFlightNumber, Object.assign(launch, { 
        flightNumber: latestFlightNumber,
        customers: ['ZTM', 'NASA'],
        upcoming: true,
        success: true
    }))
}

const abortLaunch = id => {
    const aborted = launches.get(id)

    aborted.upcoming = false
    aborted.success = false

    return aborted
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunch
}