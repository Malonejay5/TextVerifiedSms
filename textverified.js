const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')



const simpleAuthURL = 'https://www.textverified.com/Api/SimpleAuthentication'
const baseURL = 'https://www.textverified.com/api'
const simpleAccessToken = ''
const gmailID = 33
const nikeID = ''

async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

async function Auth() {
    const authHeaders = {
        headers:{
            "X-SIMPLE-API-ACCESS-TOKEN": simpleAccessToken,
            "Accept-Encoding": "*",
        }
    }
    const req = await axios.post(simpleAuthURL, null, authHeaders)
    return req.data
    
}

async function getTarget(){
    const authData = await Auth()
    const bearer_token = authData.bearer_token
    const req = await axios.get(baseURL + '/targets', {headers:{
        'Authorization': `Bearer ${bearer_token}`,
        "Accept-Encoding": "*",
    }})
    console.log(req.data)
    return req.data
}

async function gmailCode(gmailID){
    const data = {
        'id': Number(gmailID),
    }
    const authData = await Auth()
    const bearer_token = authData.bearer_token
    const req = await axios.post(baseURL + '/Verifications', data, {
        headers: {
            'Authorization': `Bearer ${bearer_token}`,
            "Accept-Encoding": "*",
        }
        
    })
    return req.data
}

async function checkAccountInfo(){
    const authData = await Auth()
    const bearer_token = authData.bearer_token
    const req = await axios.get(baseURL + '/Users', {headers:{
        'Authorization': `Bearer ${bearer_token}`,
        "Accept-Encoding": "*",
    }})
    console.log(req.data)
    return req.data
}

async function getID(){
    const authData = await Auth()
    const bearer_token = authData.bearer_token
    const req = await axios.get(baseURL + '/Verifications/Pending', {headers:{
        'Authorization': `Bearer ${bearer_token}`,
        "Accept-Encoding": "*",
    }})
    return req.data.id
}

async function getCodeInfo(codeID){
    const authData = await Auth()
    const bearer_token = authData.bearer_token
    const req = await axios.get(baseURL + `/Verifications/${codeID}`, {headers:{
        'Authorization': `Bearer ${bearer_token}`,
        "Accept-Encoding": "*",
    }})
    return req.data
}

async function cancelCode(codeID){
    const authData = await Auth()
    const bearer_token = authData.bearer_token
    const req = axios.post(baseURL + `/Verifications/${codeID}/Cancel'`, null, {
        headers: {
            'Authorization': `Bearer ${bearer_token}`,
            "Accept-Encoding": "*",
        }
    })
    return req.data
}


 async function test(){
     let getPhoneNumber = await gmailCode(gmailID)
     await sleep(2222)
     console.log('Phone Number Info: ', getPhoneNumber)
     let phoneID = getPhoneNumber.id
     let phoneNumber = getPhoneNumber.number
     let verificationLink = getPhoneNumber.verification_uri
     let cancelLink = getPhoneNumber.cancel_uri
     let reportLink = getPhoneNumber.report_uri
    
     console.log('PhoneID', phoneID)
     //await sleep(1111)
    while(true){
        let getInfo = await getCodeInfo(phoneID)
        console.log('getInfo: ', getInfo)
        if(getInfo.code == null){
            let getInfo = await getCodeInfo(phoneID)
            await sleep(3333)
            console.log(`SMS for Number -- ${getInfo.number} -- is: ${getInfo.status}`)
            console.log('SMS Code: ',getInfo.code)
            console.log('Time Remaining: ', getInfo.time_remaining)

        } else {
            let getInfo = await getCodeInfo(phoneID)
            await sleep(3333)
            console.log('Status is: ',getInfo.status)
            console.log(getInfo.sms)
            console.log('Code: ',getInfo.code)
            return
        
        
     }
    

 }
// async function test(){
//     console.log('testing')
// }

//checkAccountInfo()
//test()
//test()
//checkAccountInfo()

module.exports = {Auth, gmailCode, checkAccountInfo, getID, getCodeInfo, cancelCode,getTarget, test}
