from __future__ import division

import cv2
import numpy as np
import os
import imutils

c_SCALE = 540

def resize(img, width=None, height=None, interpolation=cv2.INTER_AREA):
    ratio = 1
    w, h, _ = img.shape

    if width is None and height is None:
        return img
    elif width is None:
        ratio = height/h
        width = int(w*ratio)
        resized = cv2.resize(img, (height, width), interpolation)
        return resized
    else:
        ratio = width/w
        height = int(h*ratio)
        resized = cv2.resize(img, (height, width), interpolation)
        return resized


def findLines(frame):
    lines = None
    img_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    for i in [3, 5, 7, 9]:
        img_blur = cv2.GaussianBlur(img_gray, (i, i), 0)

        # morphological operations
        thres_open = cv2.morphologyEx(img_blur, cv2.MORPH_OPEN, (7, 7))
        thres_close = cv2.morphologyEx(thres_open, cv2.MORPH_CLOSE, (7, 7))
        # find edges
        thres_edge = cv2.Canny(thres_close, 30, 180, apertureSize=3)
        # cv2.imshow("Gray image", thres_edge)

        # Perform HoughLines tranform.
        lines = cv2.HoughLines(thres_edge, 1, np.pi/180, 150)
        # print('* Lines len: ' + str(len(lines)))
        if lines is not None:
            if len(lines) < 6:
                return lines
                break
    return None


def calculateRotateAngle(lines):
    rotate = 0
    if lines is not None:
        i = 0
        sum = 0
        for line in lines:
            for rho, theta in line:
                angle = theta/np.pi*180
                if angle > 45 and angle < 135:
                    i += 1
                    if angle < 90:
                        sum += 90 - angle
                    else:
                        sum += 90 - angle
        if i != 0:
            rotate = sum/i

    return rotate


def rotate(frame):
    img_resized = frame.copy()
    img_resized = resize(img_resized, height=600)
    lines = findLines(img_resized)
    rotate_angle = calculateRotateAngle(lines)
    rotated = frame.copy()
    if rotate_angle != 0:
        rotated = imutils.rotate_bound(rotated, rotate_angle)

    return rotated

def resizeFrame(mat, min_size):
    height, width, channels = mat.shape
    minLenght = (height, width)[width < height]
    scaledW = round(width / (minLenght / min_size + 1))
    scaledH = round(height / (minLenght / min_size + 1))
    dim = (scaledW, scaledH)
    return cv2.resize(mat, dim)

class Preprocessor:
    def __init__(self):
        print('* Init Preprocessor.')

    def execute(self, inputData, data):
        frame = rotate(data)
        frame = resizeFrame(frame, c_SCALE)
        return frame
