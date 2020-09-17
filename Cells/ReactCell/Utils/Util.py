# coding=utf-8
from __future__ import division
import cv2
import numpy as np
import os
import imutils


def removeChars(string, chars):
    table = {ord(char): None for char in chars}
    return string.translate(table)


def removeNonNumericChars(string):
    seq_type = type(string)
    return seq_type().join(filter(seq_type.isdigit, string))


def unique_count_app(a):
    colors, count = np.unique(
        a.reshape(-1, a.shape[-1]), axis=0, return_counts=True)
    return colors[count.argmax()]


class Util:

    def removeVietnamesAccents(string):
        s1 = u'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹŸ'
        s0 = u'AAAAEEEIIOOOOUUYaaaaeeeiioooouuyAaDdIiUuOoUuAaAaAaAaAaAaAaAaAaAaAaAaEeEeEeEeEeEeEeEeIiIiOoOoOoOoOoOoOoOoOoOoOoOoUuUuUuUuUuUuUuYyYyYyYyY'
        s = ''
        string.encode('utf-8')
        for c in string:
            if c in s1:
                s += s0[s1.index(c)]
            else:
                s += c
        return s

    def fileNameFromPath(path):
        startPoint = path.rindex('/') + 1
        return path[startPoint:]

    def resizeFrame(mat, min_size):
        height, width, channels = mat.shape
        minLenght = (height, width)[width < height]
        scaledW = round(width / (minLenght / min_size + 1))
        scaledH = round(height / (minLenght / min_size + 1))
        dim = (scaledW, scaledH)
        return cv.resize(mat, dim)

    def removeBlue(mat):
        lowerBlue = (50, 20, 20)  # lower bound for each channel
        upperBlue = (170, 110, 85)  # upper bound for each channel

        # create the mask and use it to change the colors
        mask = cv.inRange(mat, lowerBlue, upperBlue)
        mat[mask != 0] = [180, 180, 180]
        return mat

    def increaseContract(mat):
        gray = cv.cvtColor(mat, cv.COLOR_BGR2GRAY)
        blur = cv.GaussianBlur(gray, (3, 3), 0)
        thresh = cv.adaptiveThreshold(
            blur, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, 9, 3)
        mat[thresh != 0] = [0, 0, 150]
        return mat

    def nameOutputFilter(name):
        detected_name = removeChars(name, 'ˆ›`_&#^(;:/|.\'-,\n\"')
        return detected_name.strip()  # Trim

    def numberOutputFilter(number):
        return removeNonNumericChars(number)

    def rotate(frame):
        img_resized = frame.copy()
        img_resized = resize(img_resized, height=600)
        lines = findLines(img_resized)
        rotate_angle = calculateRotateAngle(lines)
        rotated = frame.copy()
        if rotate_angle != 0:
            rotated = imutils.rotate_bound(rotated, rotate_angle)
        return rotated
