import requests as req
import json

gmailID = 33
nikeID = 0

baseURL = 'https://www.textverified.com'
class textVerified:


    def auth():
        simpleAccessToken = '1_iZhCjl_z0u7vjfADc5l5Y4TZrS5VdGpos8J3mwslu0faFr3AI7uvCNYjqeq48WQTXVnoD5wx'
        request = req.post('https://www.textverified.com/Api/SimpleAuthentication', headers = {
            "X-SIMPLE-API-ACCESS-TOKEN": simpleAccessToken,
        })
        json_data = json.loads(request.text)
        bearer_token = json_data["bearer_token"]
        expir = json_data["expiration"]
        ticks = json_data["ticks"]



        return json_data




    def checkTargets(tokens, targetID):
        bearer_token = tokens["bearer_token"]
        request = req.get(f'https://www.textverified.com/api/Targets/{targetID}', headers = {
            'Authorization': f'Bearer {bearer_token}'
        })
        jsonData = json.loads(request.text)
        print(jsonData)
        return jsonData




    def checkAccountInfo(tokens):
        bearer_token = tokens["bearer_token"]
        request = req.get(baseURL + '/api/Users', headers = {
            'Authorization': f'Bearer {bearer_token}'
        })
        jsonData = json.loads(request.text)
        print(jsonData)
        return jsonData




    def gmail(tokens):

        bearer_token = tokens["bearer_token"]
        request = req.post(baseURL + '/api/Verifications', headers = {
            'Authorization': f'Bearer {bearer_token}'
        },
        payload = {
            'id': gmailID,
            'areaCode': '',
            'requestedTimeAllotment': 'Not implemented'
        })
        json_data = json.loads(request.text)
        print(request.text)
        return json_data

    def getID(tokens):
        bearer_token = tokens["bearer_token"]
        request = req.post(baseURL + '/api/Verifications/Pending', headers = {
            'Authorization': f'Bearer {bearer_token}'
        })
        json_data = json.loads(request.text)
        print(request.text)
        return json_data



    def getVerificationDetails(tokens, id):
        bearer_token = tokens["bearer_token"]
        request = req.get(baseURL + f'/api/Verifications/{id}', headers = {
            'Authorization': f'Bearer {bearer_token}'
        })
        print(request.text)
        json_data = json.loads(request.text)
        return json_data

        

    def cancelVerification(tokens, id):
        bearer_token = tokens["bearer_token"]
        request = req.post(baseURL + f'/api/Verifications/{id}/Cancel', headers = {
            'Authorization': f'Bearer {bearer_token}'
        })
        print(request.text)
        jsonData = json.loads(request.text)
        return jsonData


################# RUN SCRIPT ###############


tokens = textVerified.auth()

textVerified.checkAccountInfo(tokens)
