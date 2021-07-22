def loaddevicelocations(filepath):   
    devicelocationsinput = open(filepath).read().splitlines()
    devicelocations = []
    for x in range(0, len(devicelocationsinput)):
        casedata = devicelocationsinput[x].split()
        x = float(casedata[0])
        y = float(casedata[1])
        devicelocations.append([x,y])
    return devicelocations