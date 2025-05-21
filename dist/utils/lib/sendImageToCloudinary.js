"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImagesToCloudinary = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../../config"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinaryName,
    api_key: config_1.default.cloudinaryApiKey,
    api_secret: config_1.default.cloudinaryApiSecret,
});
const sendImageToCloudinary = (imageName, path, folderName) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, {
            public_id: imageName,
            folder: folderName || config_1.default.cloudinaryImageFolderName,
        }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
            fs_1.default.unlink(path, (err) => {
                if (err) {
                    reject(err);
                }
            });
        });
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
const sendImagesToCloudinary = (images, // Expecting multiple files
folderName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadPromises = images.map((image) => {
            return new Promise((resolve, reject) => {
                const resourceType = image.mimetype.startsWith('image/')
                    ? 'image'
                    : 'video';
                cloudinary_1.v2.uploader.upload(image.path, {
                    public_id: image.filename, // Unique filename for Cloudinary
                    folder: folderName || config_1.default.cloudinaryImageFolderName,
                    resource_type: resourceType,
                }, (error, result) => {
                    // Remove file from local storage after upload
                    fs_1.default.unlink(image.path, (err) => {
                        if (err) {
                            console.error('Failed to delete local file:', err);
                        }
                    });
                    if (error) {
                        return reject(error);
                    }
                    resolve((result === null || result === void 0 ? void 0 : result.secure_url) || '');
                });
            });
        });
        // Wait for all images to upload
        const results = yield Promise.all(uploadPromises);
        // console.log('All uploads completed:', results);
        return results;
    }
    catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Failed to upload images.');
    }
});
exports.sendImagesToCloudinary = sendImagesToCloudinary;
const isProd = process.env.NODE_ENV === 'production';
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // const uploadPath = process.cwd() + '/uploads/';
        const uploadPath = isProd ? '/tmp' : process.cwd() + '/uploads';
        // console.log('Multer destination:', uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = file.fieldname + '-' + uniqueSuffix;
        // console.log('Multer filename:', filename);
        cb(null, filename);
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'video/mp4',
            'video/webm',
            'video/quicktime',
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only images and videos are allowed.'));
        }
    }
});
exports.default = cloudinary_1.v2;
