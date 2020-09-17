## API image rotation 


GET /HealthCheck PORT: 3003

{'response':'Success'}

POST /execute PORT: 3003



PORT 3003

Header: "Content-Type:application/json"

Body:
```json
{
  "image_path":"path/to/image"
}
```
Notice: Card will be stored in "path/to/image" and replace original image
- Example:
```json
{
    "imagePath" : "/home/huynv/AI_Dataset/TestData/CCCD_Detector/Any/43.jpg"
}
```
- Success response:
```json
{
  "code":200,
  "message":"detect object successfully",
  "error": "",
  "data": {}
}
```
- Failed Execution: 
```json
{
  "code":500,
  "message":<string message notify",
  "error": <string error occur",
  "data":{}
}
```
- Failed detection: image does not contain card.
```json
{
  "code": 500,
  "message": "Failed to execute",
  "error": "Card is not found",
  "data": {}
}
