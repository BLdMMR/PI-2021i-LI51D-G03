'use strict'

module.exports = function userException(message, statusCode) {
    return {
        errorMessage: message,
        errorStatusCode: statusCode
    }
}