const fs = require('fs')

function loadlinklocations(filepath){    
    let linklocationinput = fs.readFileSync(filepath, 'utf8').trim().split(/\r?\n/)
    let linklocations = []
    for (let i = 0; i < linklocationinput.length ; i += 1 ){
        let casedata = linklocationinput[i].split(' ')
        let x = parseFloat(casedata[0])
        let y = parseFloat(casedata[1])
        let r = parseFloat(casedata[2])
        linklocations.push([x, y, r])
    }
    return linklocations
}

module.exports = {
    loadlinklocations
  }