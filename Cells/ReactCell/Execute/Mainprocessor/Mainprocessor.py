
import cv2 as cv
import numpy as np

class Mainprocessor:
    def __init__(self):
        print('* Initial Mainprocessor.')

    def execute(self, inputData, frame):
        blob = cv.dnn.blobFromImage(
            frame, 1/255.0, (320, 480), (0, 0, 0), True, False)
        self.net.setInput(blob)
        ln = self.net.getLayerNames()
        ln = [ln[i[0] - 1] for i in self.net.getUnconnectedOutLayers()]
        outs = self.net.forward(ln)
        return outs

    def loadModel(self, path):
        # load model files
        config_file = path + '/yolo-obj.cfg'
        weight_file = path + '/yolo-obj.weights'

        self.net = cv.dnn.readNetFromDarknet(config_file, weight_file)
        self.net.setPreferableBackend(cv.dnn.DNN_BACKEND_CUDA)
        self.net.setPreferableTarget(cv.dnn.DNN_TARGET_CUDA)
