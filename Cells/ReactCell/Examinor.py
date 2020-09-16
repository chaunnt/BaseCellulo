from Executor import Executor
import Settings

import argparse
import json
import os

def validateResult(inputData , resultData, labels):
    #init result
    validationResult = {}

    #start validation
    for label in labels:
        validationResult[label] = 0

        #number of dectected object for 1 class
        detectedObjCount = 0
        for item in resultData:
            if item['class'] == label:
                detectedObjCount = detectedObjCount + 1

        #compare detected result to expectation
        if inputData[label] == detectedObjCount:
            #success: 1, fail: 0
            validationResult[label] = 1

    return validationResult

def showResult(result, expected):
    print("EXAMS RESULT: ")
    for key in result.keys():
        percentage = int(result[key]) / len(expected) * 100
        print(key + ": " + str(percentage) + "%")

def main(args):
    #Init settings
    Settings.init()
    Settings.enableDebug = args.debug
    print(args.debug)
    print(Settings.enableDebug)

    executor = Executor()
    validationDataPath = os.path.abspath("ValidationData")
    #Load validation data
    with open(validationDataPath + '/validator.json') as json_file:
        validationData = json.load(json_file)
    validationData = validationData['exams']

    #load labels
    label_file = executor.input.modelPath + '/yolo-obj.names'
    labels = open(label_file).read().strip().split('\n')

    #init result rate which means % success rate of each label
    resultRate = {}
    for label in labels:
        resultRate[label] = 0

    #star validation
    for item in validationData:
        #execute detection
        executeResult = executor.execute(validationDataPath + '/' + item['image'])

        #validate and get result
        validationResult = validateResult(item['data'], executeResult, labels)

        #add validation result to final result
        for label in labels:
            resultRate[label] = resultRate[label] + validationResult[label]

    showResult(resultRate, validationData)

    return

def str2bool(v):
    return v.lower() in ("yes", "y", "true", "t", "1")

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-d',
                    '--debug',
                    default=False,
                    type=str2bool,
                    help='Enable Debug',
                    required=False)
    main(parser.parse_args())
