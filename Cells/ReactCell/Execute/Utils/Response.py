import json

def successRes(data):
    return json.dumps({"code":200,"message":"Success","error":"","data":data})
def errorRes(error,msg):
    return json.dumps({"code":500,"message":msg,"error":error,"data":{}})
