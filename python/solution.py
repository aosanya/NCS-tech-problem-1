import src.devicelocationdata as devicelocationdata
import src.linklocationdata as linklocationdata
import src.linklocator as linklocator
import os
dir = os.path.dirname(__file__)

linklocationpath =  os.path.join(dir, 'data/linklocations.txt')
linklocations = linklocationdata.loadlinklocations(linklocationpath)

devicelocationpath = os.path.join(dir, 'data/devicelocations.txt')
devicelocations = devicelocationdata.loaddevicelocations(devicelocationpath)

bestlinks = linklocator.bestlinks(linklocations, devicelocations)

for key in bestlinks:
    bestlink = bestlinks[key]
    if ('power' in bestlink):
        print('Best link station for point {},{} is {},{} with power'.format(bestlink['device'][0],bestlink['device'][1],bestlink['station'][0],bestlink['station'][1],bestlink['power']))
    else:
        print('No link station within reach for point {},{}').format(bestlink['device'][0],bestlink['device'][1])