import unittest
import sys
import os
curr_dir = os.path.abspath(os.path.dirname(__file__))
src_dir = os.path.abspath(os.path.join(curr_dir, '../../src'))
sys.path.append(src_dir)
import linklocator

class TestLocatorMultiStations(unittest.TestCase):
    def test_multistations1(self):
        print('best link with 2 locations')
        stations = [[0 , 0 , 20], [0 , 0 , 30]]
        devices = [[10, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
 
        self.assertTrue(tuple(devices[0]) in bestlinks, 'Best link not reported');
        self.assertTrue('power' in bestlinks[tuple(devices[0])], 'Power not reported');    
        self.assertEqual(bestlinks[tuple(devices[0])]['power'], 400, 'Correct power not reported');  

        self.assertTrue('distance' in bestlinks[tuple(devices[0])], 'Distance not reported'); 
        self.assertEqual(bestlinks[tuple(devices[0])]['distance'], 10, 'Correct distance not reported'); 

    def test_multistations2(self):
        print('best link with 3 locations')
        stations = [[0 , 0 , 20], [0 , 0 , 30], [0 , 0 , 40]]
        devices = [[10, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
 
        self.assertTrue(tuple(devices[0]) in bestlinks, 'Best link not reported');
        self.assertTrue('power' in bestlinks[tuple(devices[0])], 'Power not reported');    
        self.assertEqual(bestlinks[tuple(devices[0])]['power'], 900, 'Correct power not reported');  

        self.assertTrue('distance' in bestlinks[tuple(devices[0])], 'Distance not reported'); 
        self.assertEqual(bestlinks[tuple(devices[0])]['distance'], 10, 'Correct distance not reported'); 

    def test_multistations3(self):
        print('best link with 3 locations unordered')
        stations = [[0 , 0 , 40], [0 , 0 , 20], [0 , 0 , 30]]
        devices = [[10, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
 
        self.assertTrue(tuple(devices[0]) in bestlinks, 'Best link not reported');
        self.assertTrue('power' in bestlinks[tuple(devices[0])], 'Power not reported');    
        self.assertEqual(bestlinks[tuple(devices[0])]['power'], 900, 'Correct power not reported');  

        self.assertTrue('distance' in bestlinks[tuple(devices[0])], 'Distance not reported'); 
        self.assertEqual(bestlinks[tuple(devices[0])]['distance'], 10, 'Correct distance not reported'); 
   

if __name__ == '__main__':
    unittest.main()