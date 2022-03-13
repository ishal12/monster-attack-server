const SUCCESS_MESSAGE = 'Success load data.';
const ERROR_MESSAGE = 'Failed load data.';
const VALIDATION_MESSAGE = 'Validation error.';

const successResponse = (res, data = null, message = SUCCESS_MESSAGE) => {
    return res.status(200).json({
        status: true,
        message: message,
        data: data,
    });
};

const errorResponse = (res, message = ERROR_MESSAGE) => {
    return res.status(500).json({
        status: false,
        message: message,
        data: null,
    });
};

const validationResponse = (res, data, message = VALIDATION_MESSAGE) => {
    return res.status(400).json({
        status: false,
        message: message,
        data: data,
    });
};

const notFoundResponse = (res, message) => {
    return res.status(404).json({
        status: false,
        message: message,
    });
};

const unauthorizedResponse = (res, message) => {
    return res.status(401).json({
        status: false,
        message: message,
    });
};

module.exports = {
    successResponse,
    errorResponse,
    validationResponse,
    notFoundResponse,
    unauthorizedResponse
}
