import unittest
import sys
import os
curr_dir = os.path.abspath(os.path.dirname(__file__))
src_dir = os.path.abspath(os.path.join(curr_dir, '../../src'))
sys.path.append(src_dir)
import linklocator

class TestLocator(unittest.TestCase):
    def test_locate1(self):
        stations = [[0 ,0 ,0]]
        devices = [[0, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
        self.assertTrue(tuple(devices[0]) in bestlinks,  'Best link not reported ')
        self.assertFalse('power' in bestlinks[tuple(devices[0])],  'Should not return value since reach is 0 ')        
    
    def test_locate2(self):
        stations = [[0 ,0 , 10]]
        devices = [[0, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
        self.assertTrue(tuple(devices[0]) in bestlinks,  'Best link not reported ')
        self.assertTrue('power' in bestlinks[tuple(devices[0])],  'Power not reported ')    
        self.assertEqual(bestlinks[tuple(devices[0])]['power'], 100,  'Correct power not reported ')  

        self.assertTrue('distance' in bestlinks[tuple(devices[0])],  'Distance not reported ') 
        self.assertEqual(bestlinks[tuple(devices[0])]['distance'], 0,  'Correct distance not reported ') 
    
    def test_locate_3_when_power_is_0(self):
        stations = [[10 ,0 , 10]]
        devices = [[0, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
 
        self.assertTrue(tuple(devices[0]) in bestlinks,  'Best link not reported ')
        self.assertFalse('power' in bestlinks[tuple(devices[0])],  'Power should not be reported ') 
    
    def test_locate_4_x_of_station_set(self):
        stations = [[10 ,0 , 20]]
        devices = [[0, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
 
        self.assertTrue(tuple(devices[0]) in bestlinks,  'Best link not reported ')
        self.assertTrue('power' in bestlinks[tuple(devices[0])],  'Power not reported ')    
        self.assertEqual(bestlinks[tuple(devices[0])]['power'], 100,  'Correct power not reported ')  

        self.assertTrue('distance' in bestlinks[tuple(devices[0])],  'Distance not reported ') 
        self.assertEqual(bestlinks[tuple(devices[0])]['distance'], 10,  'Correct distance not reported ') 
    
    def test_locate_5_y_of_station_set(self):
        stations = [[0 ,10 , 20]]
        devices = [[0, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
 
        self.assertTrue(tuple(devices[0]) in bestlinks,  'Best link not reported ')
        self.assertTrue('power' in bestlinks[tuple(devices[0])],  'Power not reported ')    
        self.assertEqual(bestlinks[tuple(devices[0])]['power'], 100,  'Correct power not reported ')  

        self.assertTrue('distance' in bestlinks[tuple(devices[0])],  'Distance not reported ') 
        self.assertEqual(bestlinks[tuple(devices[0])]['distance'], 10,  'Correct distance not reported ') 
    
    def test_locate_6_x_of_device_set(self):
        stations = [[0 , 0 , 20]]
        devices = [[10, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
 
        self.assertTrue(tuple(devices[0]) in bestlinks,  'Best link not reported ')
        self.assertTrue('power' in bestlinks[tuple(devices[0])],  'Power not reported ')    
        self.assertEqual(bestlinks[tuple(devices[0])]['power'], 100,  'Correct power not reported ')  

        self.assertTrue('distance' in bestlinks[tuple(devices[0])],  'Distance not reported ') 
        self.assertEqual(bestlinks[tuple(devices[0])]['distance'], 10,  'Correct distance not reported ') 
    
    def test_locate_7_y_of_device_set(self):
        stations = [[0 , 0 , 20]]
        devices = [[10, 0]]
        bestlinks = linklocator.bestlinks(stations, devices)
 
        self.assertTrue(tuple(devices[0]) in bestlinks,  'Best link not reported ')
        self.assertTrue('power' in bestlinks[tuple(devices[0])],  'Power not reported ')    
        self.assertEqual(bestlinks[tuple(devices[0])]['power'], 100,  'Correct power not reported ')  

        self.assertTrue('distance' in bestlinks[tuple(devices[0])],  'Distance not reported ') 
        self.assertEqual(bestlinks[tuple(devices[0])]['distance'], 10,  'Correct distance not reported ') 
    

if __name__ == '__main__':
    unittest.main()