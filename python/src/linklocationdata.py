def loadlinklocations(filepath):   
    linklocationsinput = open(filepath).read().splitlines()
    linklocations = []
    for x in range(0, len(linklocationsinput)):
        casedata = linklocationsinput[x].split()
        x = float(casedata[0])
        y = float(casedata[1])
        r = float(casedata[2])
        linklocations.append([x,y,r])
    return linklocations