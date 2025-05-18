"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { ZodError } from 'zod';
// import zodErrorhandler from '../errors/zodErrorHandler';
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const castErrorHandler_1 = __importDefault(require("../errors/castErrorHandler"));
const validationErrorHandler_1 = __importDefault(require("../errors/validationErrorHandler"));
const duplicateKeyErrorHandler_1 = __importDefault(require("../errors/duplicateKeyErrorHandler"));
const globalErrorHandler = (err, req, res, next) => {
    // setting default values
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = 'Something Went Wrong';
    let errorSources = [
        {
            path: '',
            message: 'Something Went Wrong',
        },
    ];
    // if (err instanceof ZodError) {
    //   const formattedError = zodErrorhandler(err);
    //   statusCode = formattedError?.statusCode;
    //   message = formattedError?.message;
    //   errorSources = formattedError?.errorSources;
    // } else
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const formattedError = (0, validationErrorHandler_1.default)(err);
        statusCode = formattedError === null || formattedError === void 0 ? void 0 : formattedError.statusCode;
        message = formattedError === null || formattedError === void 0 ? void 0 : formattedError.message;
        errorSources = formattedError === null || formattedError === void 0 ? void 0 : formattedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const formattedError = (0, castErrorHandler_1.default)(err);
        statusCode = formattedError === null || formattedError === void 0 ? void 0 : formattedError.statusCode;
        message = formattedError === null || formattedError === void 0 ? void 0 : formattedError.message;
        errorSources = formattedError === null || formattedError === void 0 ? void 0 : formattedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const formattedError = (0, duplicateKeyErrorHandler_1.default)(err);
        statusCode = formattedError === null || formattedError === void 0 ? void 0 : formattedError.statusCode;
        message = formattedError === null || formattedError === void 0 ? void 0 : formattedError.message;
        errorSources = formattedError === null || formattedError === void 0 ? void 0 : formattedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.name;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.name;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    // final return
    res.status(statusCode).json({
        success: false,
        message: message,
        errorSources,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
        // err,
    });
    return;
};
exports.default = globalErrorHandler;
