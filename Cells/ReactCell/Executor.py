from Execute.Mainprocessor.Mainprocessor import Mainprocessor
from Execute.Postprocessor.Postprocessor import Postprocessor
from Execute.Preprocessor.Preprocessor import Preprocessor
from Execute.DataModel.InputModel import InputData

import os
import cv2 as cv

class Executor:
    def __init__(self):
        print('* Init Executor')
        self.Mainprocessor = Mainprocessor()
        self.Postprocessor = Postprocessor()
        self.Preprocessor = Preprocessor()

        modelPath = os.path.abspath("Model/")

        self.input = InputData()
        self.input.modelPath = modelPath

        self.Mainprocessor.loadModel(modelPath)

    def execute(self, imagePath):
        self.input.imagePath = imagePath

        # read image
        data = cv.imread(self.input.imagePath)

        # pre-process image
        data = self.Preprocessor.execute(self.input, data)

        # execute process
        executeResult = self.Mainprocessor.execute(self.input, data)

        # post process
        finalResult = self.Postprocessor.execute(self.input, data, executeResult)

        self.output = finalResult

        return finalResult
