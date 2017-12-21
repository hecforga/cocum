import base64
import requests
import json

from oauth2client.client import GoogleCredentials
from googleapiclient import discovery
from googleapiclient import errors


values = {
    "vestidos": {
        "fit": ['holgado', 'ajustado', 'convuelo'],
        "length": ['largo', 'midi', 'corto'],
        "neck": ['bardot', 'escoteu', 'escotev', 'sinescote'],
        "print": ['cuadros', 'floral', 'liso', 'lunares', 'rayash', 'rayasv'],
        "sleeve": ['mangacorta', 'mangalarga', 'tirantes']
    }
}

def get_prediction(event, context):
    credentials = GoogleCredentials.get_application_default()
    ml = discovery.build('ml','v1', credentials=credentials)

    event_data = json.loads(event['body'])['data']
    category = event_data['category']
    property = event_data['property']
    name = 'projects/{}/models/{}'.format('cocum-187309', category + '_' + property)
    #name = 'projects/{}/models/{}'.format('cocum-187309', 'flowers_retrain_new')
    imageUrl = event_data['imageUrl']
    instances = [
        { "image_bytes": { "b64": base64.b64encode(requests.get(imageUrl).content) } }
    ]

    try:
        gcloud_response = ml.projects().predict(
            name=name,
            body={ "instances": instances }
        ).execute()
        scores = gcloud_response['predictions'][0]['prediction']
        prediction = values[category][property][scores.index(max(scores))]

        body = {
            "data": {
                "scores": scores,
                "prediction": prediction
            }
        }

        response = {
            "statusCode": 200,
            "body": json.dumps(body)
        }
    except:
        response = {
            "statusCode": 500,
            "body": { "message": 'Error getting prediction' }
        }

    return response
