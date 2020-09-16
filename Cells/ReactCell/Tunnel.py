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

@app.route('/health',methods=['GET'])
def healthCheck():
    return json.dumps({'response':'Success'})

@app.route('/execute',methods=['POST'])
def execute():
    try:
        data = request.json
        imagePath = data.get('imagePath')
        executor.execute(imagePath)

        return successRes(executor.output)
    except Exception as e:
        return errorRes(str(e),"Failed to execute")

if __name__ == "__main__":
    app.run(os.environ.get('HOST','localhost'),int(os.environ.get('PORT','3001')))
