# -*- coding: utf-8 -*-
from Utils.Response import successRes, errorRes
from Executor import Executor

import sys
import os
import time
import json
import flask
from flask import Flask,request
import numpy as np

app = Flask(__name__)
executor = Executor()

@app.route('/HealthCheck',methods=['GET'])
def healthCheck():
    return json.dumps({'response':'Success'})

@app.route('/execute',methods=['POST'])
def execute():
    try:
        data = request.json
        imagePath = data.get('imagePath')
        if not imagePath:
            return errorRes("body is invalid,", "data input is incorrect")
        finalResult = executor.execute(imagePath)
        if finalResult == False:
            return errorRes("Card is not found","Failed to execute")
        return successRes()
    except Exception as e:
        return errorRes(str(e),"Failed to execute")

if __name__ == "__main__":
    app.run(os.environ.get('HOST','localhost'),int(os.environ.get('PORT','3003')), threaded = True)
