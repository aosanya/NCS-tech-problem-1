const linklocator = require("./linklocator")

let stations = [[20, 20, 19], [20, 20, 20], [20, 20, 21], [20, 20, 22], , [20, 20, 22]]
let device = [0, 0]
let trimSearch = linklocator.trimSearch(stations, device)
console.log(trimSearch)

let stations1 = [[18, 18, 20], [19, 19, 20], [20, 20, 20], [21, 21, 20],[22, 22, 20]]
let device1 = [0, 0]
let trimSearch1 = linklocator.trimSearch(stations1, device1)
console.log(trimSearch1)