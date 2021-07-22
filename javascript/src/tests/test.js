var assert = require('assert');
const linklocator = require("../linklocator")

describe('utilities', function () {
    describe('get distance', function () {
        it('should return 10 with only x1 set', function () {
            assert.strictEqual(linklocator.distance(10, 0, 0, 0), 10);
        });
        it('should return 10 with only y1 set', function () {
            assert.strictEqual(linklocator.distance(0, 10, 0, 0), 10);
        });
        it('should return 10 with only x2 set', function () {
            assert.strictEqual(linklocator.distance(0, 0, 10, 0), 10);
        });
        it('should return 10 with only y2 set', function () {
            assert.strictEqual(linklocator.distance(0, 0, 0, 10), 10);
        });
    });
    describe('get power', function () {
        it('should return 0 when distance > reach ', function () {
            assert.strictEqual(linklocator.power(0,10), 0, `Got ${linklocator.power(0,10)}`);
        });
        it('should return 0 when distance = reach ', function () {
            assert.strictEqual(linklocator.power(10,10), 0, `Got ${linklocator.power(10,10)}`);
        });
        it('should return positive power ', function () {
            assert.strictEqual(linklocator.power(20,10), 100, `Got ${linklocator.power(20,10)}`);
        });
    });    
});

describe('Trim Search', function () {
    it('Trim too far on X', function () {
        let stations = [[20, 20, 19], [20, 20, 20], [20, 20, 21], [20, 20, 22], [20, 20, 22]]
        let device = [0, 0]
        let expectedResults = [ [ 20, 20, 21 ], [ 20, 20, 22 ], [ 20, 20, 22 ]]
        let expectedHashed = {}
        for (const item of expectedResults) {
            expectedHashed[item] = true
        }
        let trimSearch = linklocator.trimSearch(stations, device)
        assert(trimSearch.length == 3, `Locations not found`);
        
        let result = linklocator.trimSearch(stations, device)
        assert(result.length == 3, `Locations not found`);
        let resultHashed = {}
        for (const item of result) {
            resultHashed[item] = true
        }

        for (const key of Object.keys(resultHashed)) {
            assert(key in expectedHashed, `Did not find ${key}`)
        }
    })

    it('Trim too far on Y', function () {
        let stations = [[18, 18, 20], [19, 19, 20], [20, 20, 20], [21, 21, 20],[22, 22, 20]]
        let device = [0, 0]
        let expectedResults = [ [ 18, 18, 20 ], [ 19, 19, 20 ] ]
        let expectedHashed = {}
        for (const item of expectedResults) {
            expectedHashed[item] = true
        }

        let result = linklocator.trimSearch(stations, device)
        assert(result.length == 2, `Locations not found`);
        let resultHashed = {}
        for (const item of result) {
            resultHashed[item] = true
        }

        for (const key of Object.keys(resultHashed)) {
            assert(key in expectedHashed, `Did not find ${key}`)
        }
    })
});

describe('basic locator', function () {
    it('locate No Station', function () {
        let stations = []
        let devices = [[0, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == false, `Should not return value since reach is 0`);        
    });
    it('locate 1', function () {
        let stations = [[0 ,0 ,0]]
        let devices = [[0, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == false, `Should not return value since reach is 0`);        
    });
    it('locate 2', function () {
        let stations = [[0 ,0 , 10]]
        let devices = [[0, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[0]]['power'], 100, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[0]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[0]]['distance'], 0, `Correct distance not reported`); 
    });
    it('locate 3, when power is 0', function () {
        let stations = [[10 ,0 , 10]]
        let devices = [[0, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
 
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == false, `Power should not be reported`); 
    });
    it('locate 4, x of station set', function () {
        let stations = [[10 ,0 , 20]]
        let devices = [[0, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
 
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[0]]['power'], 100, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[0]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[0]]['distance'], 10, `Correct distance not reported`); 
    });
    it('locate 5, y of station set', function () {
        let stations = [[0 ,10 , 20]]
        let devices = [[0, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
 
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[0]]['power'], 100, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[0]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[0]]['distance'], 10, `Correct distance not reported`); 
    });
    it('locate 6, x of device set', function () {
        let stations = [[0 , 0 , 20]]
        let devices = [[10, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
 
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[0]]['power'], 100, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[0]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[0]]['distance'], 10, `Correct distance not reported`); 
    });
    it('locate 7, y of device set', function () {
        let stations = [[0 , 0 , 20]]
        let devices = [[10, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
 
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[0]]['power'], 100, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[0]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[0]]['distance'], 10, `Correct distance not reported`); 
    });
})

describe('best link locator', function () {    
    it('best link with 2 locations', function () {
        let stations = [[0 , 0 , 20], [0 , 0 , 30]]
        let devices = [[10, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
 
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[0]]['power'], 400, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[0]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[0]]['distance'], 10, `Correct distance not reported`); 
    });
    it('best link with 3 locations', function () {
        let stations = [[0 , 0 , 20], [0 , 0 , 30], [0 , 0 , 40]]
        let devices = [[10, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
 
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[0]]['power'], 900, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[0]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[0]]['distance'], 10, `Correct distance not reported`); 
    });
    it('best link with 3 locations unordered', function () {
        let stations = [[0 , 0 , 40], [0 , 0 , 20], [0 , 0 , 30]]
        let devices = [[10, 0]]
        let bestlinks = linklocator.bestlinks(stations, devices)
 
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[0]]['power'], 900, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[0]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[0]]['distance'], 10, `Correct distance not reported`); 
    });
})

describe('best link locator, many devices', function () {    
    let stations = [[0 , 0 , 20], [0 , 0 , 30], [0 , 0 , 40]]
    let devices = [[10, 0], [20, 0]]
    let bestlinks = linklocator.bestlinks(stations, devices)

    it('best link with 3 locations, 2 devices, 1st device', function () {
        assert(devices[0] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[0]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[0]]['power'], 900, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[0]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[0]]['distance'], 10, `Correct distance not reported`); 
    });
    
    it('best link with 3 locations, 2 devices, 2nd device', function () {
        assert(devices[1] in bestlinks == true, `Best link not reported`);
        assert('power' in bestlinks[devices[1]] == true, `Power not reported`);    
        assert.strictEqual(bestlinks[devices[1]]['power'], 400, `Correct power not reported`);  

        assert('distance' in bestlinks[devices[1]] == true, `Distance not reported`); 
        assert.strictEqual(bestlinks[devices[1]]['distance'], 20, `Correct distance not reported`); 
    });
})