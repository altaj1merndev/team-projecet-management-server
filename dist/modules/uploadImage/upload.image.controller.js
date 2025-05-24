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
exports.UploadImageControllers = void 0;
const handleAsyncRequest_1 = __importDefault(require("../../utils/share/handleAsyncRequest"));
const sendImageToCloudinary_1 = require("../../utils/lib/sendImageToCloudinary");
const sendResponse_1 = __importDefault(require("../../utils/share/sendResponse"));
const uploadMultipleImages = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const path = file === null || file === void 0 ? void 0 : file.path;
    if (!path) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'No image file provided',
            data: null,
        });
    }
    const imageName = `softvence-${Date.now()}`;
    const result = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path, 'web_user');
    console.log({ result });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Images uploaded successfully',
        data: result,
    });
}));
// const removeImage = handleAsyncRequest(async (req: Request, res: Response) => {
// const publicId = decodeURIComponent(req.params.publicId);
//   if (!publicId) {
//     return sendResponse(res, {
//       statusCode: 400,
//       success: false,
//       message: 'Image public ID is required',
//       data: null,
//     });
//   }
//   const result = await deleteImageFromCloudinary(publicId);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Image deleted successfully',
//     data: result,
//   });
// });
const removeImage = (0, handleAsyncRequest_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicId } = req.body; // <-- catch-all wildcard
    console.log('Deleting public ID:', publicId);
    if (!publicId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: 'Image public ID is required',
            data: null,
        });
    }
    const result = yield (0, sendImageToCloudinary_1.deleteImageFromCloudinary)(publicId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Image deleted successfully',
        data: result,
    });
}));
exports.UploadImageControllers = {
    uploadMultipleImages,
    removeImage
};
