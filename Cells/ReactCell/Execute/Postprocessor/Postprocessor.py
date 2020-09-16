import Settings

import cv2
import numpy as np
import json

c_CONFIDENCE_THRESHOLD = 0.5
c_NMS_THRESHOLD = 0.5

class Postprocessor:
    def __init__(self):
        print('* Init Postprocessor.')
        self.output = {}

    def execute(self, inputData, frame, data):
        # init net and labels
        label_file = inputData.modelPath + '/yolo-obj.names'
        self.labels = open(label_file).read().strip().split('\n')

        # initialize a list of colors to represent each possible class label
        np.random.seed(42)
        self.colors = np.random.randint(
            0, 255, size=(len(self.labels), 3), dtype="uint8")

        (H, W) = frame.shape[:2]
        # initialize our lists of detected bounding boxes, confidences, and
        # class IDs, respectively
        boxes = []
        confidences = []
        classIDs = []
        self.output = []
        for output in data:
            for detection in output:
                # extract the class ID and confidence (i.e., probability) of
                # the current object detection
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                # filter out weak predictions by ensuring the detected
                # probability is greater than the minimum probability
                if confidence > c_CONFIDENCE_THRESHOLD:
                    # scale the bounding box coordinates back relative to the
                    # size of the image, keeping in mind that YOLO actually
                    # returns the center (x, y)-coordinates of the bounding
                    # box followed by the boxes' width and height
                    box = detection[0:4] * np.array([W, H, W, H])
                    (centerX, centerY, width, height) = box.astype("int")
                    # use the center (x, y)-coordinates to derive the top and
                    # and left corner of the bounding box
                    x = int(centerX - (width / 2))
                    y = int(centerY - (height / 2))
                    # update our list of bounding box coordinates, confidences,
                    # and class IDs
                    boxes.append([x, y, int(width), int(height)])
                    confidences.append(float(confidence))
                    classIDs.append(classID)

                    self.output.append({
                        'class': self.labels[classID],
                        'x': x,
                        'y': y,
                        'width': W,
                        'height': H
                    })


        #for DEBUG purpose only
        debugToggle = Settings.enableDebug
        if debugToggle == True:
            indices = cv2.dnn.NMSBoxes(
                boxes, confidences, c_CONFIDENCE_THRESHOLD, c_NMS_THRESHOLD)
            if len(indices) > 0:
                for i in indices.flatten():
                    # extract the bounding box coordinates
                    (x, y) = (boxes[i][0], boxes[i][1])
                    (w, h) = (boxes[i][2], boxes[i][3])
                    # if self.labels[classIDs[i]] == 'name':
                    detectFrame = frame[y:y+h, x:x+w]
                    # draw a bounding box rectangle and label on the image
                    color = [int(c) for c in self.colors[classIDs[i]]]
                    cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
                    text = "{}: {:.4f}".format(
                        self.labels[classIDs[i]], confidences[i])
                    cv2.putText(frame, text, (x, y - 5),
                               cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

                cv2.imshow('Image', frame)
                cv2.waitKey(0)

        return self.output
