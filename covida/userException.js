'use strict'

module.exports = function userException(message, statusCode) {
    return {
        message: message,
        status: statusCode
    }
}