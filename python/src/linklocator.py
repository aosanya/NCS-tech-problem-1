import math
def distance(x1, y1, x2, y2):
    return math.sqrt(math.pow((x1 - x2), 2) + math.pow((y1 - y2), 2))

def power(reach, distance):
    if (distance >= reach):
        return 0 
    return math.pow((reach - distance), 2)


def trimSearch(stations, device):
    def withinXReach(station, device) :
        return abs(station[0] - device[0]) < station[2]
    
    def withinYReach(station, device) :
        return abs(station[1] - device[1]) < station[2]      
    
    stations = filter(lambda station: withinXReach(station, device), stations)
    stations = filter(lambda station: withinYReach(station, device), stations)

    return stations


def bestlinks(stations, devices):
    bestlinks = {}
    for x in range(0, len(devices)):
        device = devices[x]        
        bestlinks[tuple(device)] = {'device' : device}
        trimedStations = trimSearch(stations, device)
        if (len(trimedStations) == 0):
             continue
        for y in range(0, len(trimedStations)):
            station = trimedStations[y]
            linkdistance = distance(device[0], device[1], station[0], station[1])
            linkpower = power(station[2], linkdistance) 
            if (linkpower == 0):
                continue
            if ('power' in bestlinks[tuple(device)]):
                if (linkpower < bestlinks[tuple(device)]['power']):
                    continue
            
            bestlinks[tuple(device)]['device'] =  device
            bestlinks[tuple(device)]['station'] =  station
            bestlinks[tuple(device)]['distance'] =  linkdistance
            bestlinks[tuple(device)]['power'] =  linkpower
                   
    return bestlinks