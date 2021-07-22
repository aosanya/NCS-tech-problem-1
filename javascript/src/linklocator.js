function distance(x1, y1, x2, y2){
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
}

function power(reach, distance){
    if (distance >= reach) return 0 
    return Math.pow((reach - distance), 2)
}

function trimSearch(stations, device){
    function withinXReach(device) {
        return function(element) {
            return Math.abs(element[0] - device[0]) < element[2]
        }
    }
    
    function withinYReach(device) {
        return function(element) {
            return Math.abs(element[1] - device[1]) < element[2]
        }
    }

    stations = stations.filter(withinXReach(device))
    stations = stations.filter(withinYReach(device))

    return stations
}

function bestlinks(stations, devices){
    let bestlinks = {}
    console.log(stations)
    console.log(devices)
    for (const device of devices) {
        bestlinks[device] = {device : device}
        let trimedStations = trimSearch(stations, device)
        if (trimedStations.length == 0) continue
        for (const station of trimedStations) {
            let linkdistance = distance(device[0], device[1], station[0], station[1])
            let linkpower = power(station[2], linkdistance) 
            if (linkpower == 0) continue
            if ('power' in bestlinks[device]){
                if (linkpower < bestlinks[device]['power']) continue
            }
            bestlinks[device]['station'] =  station
            bestlinks[device]['distance'] =  linkdistance
            bestlinks[device]['power'] =  linkpower
        }        
    }
    return bestlinks
}

module.exports = {
    bestlinks,
    distance,
    power,
    trimSearch
}