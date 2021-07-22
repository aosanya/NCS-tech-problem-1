const fs = require('fs')

function loadlinklocations(filepath){    
    let linklocationinput = fs.readFileSync(filepath, 'utf8').trim().split(/\r?\n/)
    let linklocations = []
    for (let i = 0; i < linklocationinput.length ; i += 1 ){
        let casedata = linklocationinput[i].split(' ')
        let x = float(casedata[0])
        let y = float(casedata[1])
        let r = float(casedata[2])
        linklocations.push([x, y, r])
    }
    return linklocations
}

module.exports = {
    loadlinklocations
  }