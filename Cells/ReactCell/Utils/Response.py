import json

def successRes():
    return json.dumps({"code":200,"message":"detect object successfully","error":"","data": {}})
def errorRes(error,msg):
    return json.dumps({"code":500,"message":msg,"error":error,"data":{}})
