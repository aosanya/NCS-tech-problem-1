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

describe('locator', function () {
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