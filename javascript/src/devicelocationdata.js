const fs = require('fs')

function loaddevicelocations(filepath){    
    let devicelocationsinput = fs.readFileSync(filepath, 'utf8').trim().split(/\r?\n/)
    let devicelocations = []
    for (let i = 0; i < devicelocationsinput.length ; i += 1 ){
        let casedata = devicelocationsinput[i].split(' ')
        let x = parseFloat(casedata[0])
        let y = parseFloat(casedata[1])
        devicelocations.push([x, y])
    }
    return devicelocations
}

module.exports = {
    loaddevicelocations
}