import unittest
import sys
import os
curr_dir = os.path.abspath(os.path.dirname(__file__))
src_dir = os.path.abspath(os.path.join(curr_dir, '../../src'))
sys.path.append(src_dir)
import linklocator

class TestUtilities(unittest.TestCase):
    def test_get_distance_x1(self):
        print('Test get distance when only x1 is set')
        self.assertEqual(linklocator.distance(10, 0, 0, 0), 10)

    def test_get_distance_y1(self):
        print('Test get distance when only x2 is set')
        self.assertEqual(linklocator.distance(0, 10, 0, 0), 10)

    def test_get_distance_x2(self):
        print('Test get distance when only x1 is set')
        self.assertEqual(linklocator.distance(0, 0, 10, 0), 10)
    
    def test_get_distance_y2(self):
        print('Test get distance when only y2 is set')
        self.assertEqual(linklocator.distance(0, 0, 0, 10), 10)

    def test_get_power(self):
        print('Test get power')
        self.assertEqual(linklocator.power(0,10), 0, 'Got {}'.format(linklocator.power(0,10)))

    def test_get_power_1(self):
        print('Test should return 0 when distance = reach ')
        self.assertEqual(linklocator.power(10,10), 0, 'Got {}'.format(linklocator.power(10,10)))

    def test_get_power_2(self):
        print('Test return positive power')
        self.assertEqual(linklocator.power(20,10), 100, 'Got {}'.format(linklocator.power(20,10)))  

if __name__ == '__main__':
    unittest.main()