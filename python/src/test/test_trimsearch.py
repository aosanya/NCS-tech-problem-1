import unittest
import sys
import os
curr_dir = os.path.abspath(os.path.dirname(__file__))
src_dir = os.path.abspath(os.path.join(curr_dir, '../../src'))
sys.path.append(src_dir)
import linklocator

class TestTrimSearch(unittest.TestCase):
    def test_trim_stations_too_far_x(self):
        print('Trim too far on X')
        stations = [[20, 20, 19], [20, 20, 20], [20, 20, 21], [20, 20, 22], [20, 20, 22]]
        device = [0, 0]
        expectedResults = [ [ 20, 20, 21 ], [ 20, 20, 22 ], [ 20, 20, 22 ]]
        expectedHashed = {}
        for item in expectedResults:
            expectedHashed[tuple(item)] = True
        
        trimSearch = linklocator.trimSearch(stations, device)
        self.assertTrue(len(trimSearch) == 3, 'Locations not found');
        
        result = linklocator.trimSearch(stations, device)
        self.assertTrue(len(result) == 3, 'Locations not found')
        resultHashed = {}
        for item in result:
            resultHashed[tuple(item)] = True


        for idx in resultHashed:
            self.assertTrue(idx in expectedHashed, 'Did not find {}'.format(idx))

    def test_trim_stations_too_far_y(self):
        print('Trim too far on Y')
        stations = [[18, 18, 20], [19, 19, 20], [20, 20, 20], [21, 21, 20],[22, 22, 20]]
        device = [0, 0]
        expectedResults = [ [ 18, 18, 20 ], [ 19, 19, 20 ] ]
        expectedHashed = {}
        for item in expectedResults:
            expectedHashed[tuple(item)] = True
        
        trimSearch = linklocator.trimSearch(stations, device)
        self.assertTrue(len(trimSearch) == 2, 'Locations not found');
        
        result = linklocator.trimSearch(stations, device)
        self.assertTrue(len(result) == 2, 'Locations not found')
        resultHashed = {}
        for item in result:
            resultHashed[tuple(item)] = True


        for idx in resultHashed:
            self.assertTrue(idx in expectedHashed, 'Did not find {}'.format(idx))

    # def ('Trim too far on Y', function () {
    #     let stations = [[18, 18, 20], [19, 19, 20], [20, 20, 20], [21, 21, 20],[22, 22, 20]]
    #     let device = [0, 0]
    #     let expectedResults = [ [ 18, 18, 20 ], [ 19, 19, 20 ] ]
    #     let expectedHashed = {}
    #     for (const item of expectedResults) {
    #         expectedHashed[item] = true
    #     }

    #     let result = linklocator.trimSearch(stations, device)
    #     assert(result.length == 2, `Locations not found`);
    #     let resultHashed = {}
    #     for (const item of result) {
    #         resultHashed[item] = true
    #     }

    #     for (const key of Object.keys(resultHashed)) {
    #         assert(key in expectedHashed, `Did not find ${key}`)
    #     }


if __name__ == '__main__':
    unittest.main()