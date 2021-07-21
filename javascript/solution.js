const path = require("path");
const linklocator = require("./src/linklocator")

const linklocationdata = require("./src/linklocationdata")
let linklocationpath = path.resolve(__dirname, "./data/linklocations.txt")
let linklocations = linklocationdata.loadlinklocations(linklocationpath)

const devicelocationdata = require("./src/devicelocationdata")
let devicelocationpath = path.resolve(__dirname, "./data/linklocations.txt")
let devicelocations = devicelocationdata.loaddevicelocations(devicelocationpath)

let bestlinks = linklocator.bestlinks(linklocations, devicelocations)

for (const bestlinkidx in bestlinks) {
    let bestlink = bestlinks[bestlinkidx]
    if ('power' in bestlink){
        console.log(`Best link station for point ${bestlink['device'][0]},${bestlink['device'][1]} is ${bestlink['station'][0]},${bestlink['station'][1]} with power ${bestlink['power']}`)
    }
    else{
        console.log(`No link station within reach for point ${bestlink['station'][0]},${bestlink['station'][1]}`)
    }
}
