const crypto = require('crypto');

export default {
    generateSalt: () =>
        crypto.randomBytes(128).toString('base64'),
    generateHashedPassword: (salt, password) =>
        crypto.createHmac('sha256', salt).update(password).digest('hex')
};