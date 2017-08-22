const crypto = require('crypto');

// see https://docs.microsoft.com/en-us/rest/api/apimanagement/apimanagementrest/azure-api-management-rest-api-authentication#ProgrammaticallyCreateToken
function createSasToken() {

    const now = new Date()
    const addTime = new Date(now.getTime() + (process.env.minutesValid * 60 * 1000))
    // using the replace to add additional percision as required by docs
    const expiry = addTime.toISOString().replace('Z', '0000Z');
    
    const signatureUTF8 = JSON.parse(JSON.stringify(`${process.env.id}\n${expiry}`));
    const hash = crypto.createHmac('sha512', process.env.key).update(signatureUTF8).digest('base64');

    return `SharedAccessSignature uid=${process.env.id}&ex=${expiry}&sn=${hash}`;
}

console.log(`sasToken=${createSasToken()}`);