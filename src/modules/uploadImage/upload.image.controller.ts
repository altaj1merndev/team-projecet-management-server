import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import { deleteImageFromCloudinary, sendImagesToCloudinary, sendImageToCloudinary } from '../../utils/lib/sendImageToCloudinary';
import sendResponse from '../../utils/share/sendResponse';


const uploadMultipleImages = handleAsyncRequest(
  async (req: Request, res: Response) => {
const file = req.file;
const path = file?.path;
if (!path) {
  return sendResponse(res, {
    statusCode: 400,
    success: false,
    message: 'No image file provided',
    data: null,
  });
}
const imageName = `softvence-${Date.now()}`;
const result = await sendImageToCloudinary(
  imageName,
  path,
  'web_user',
);
console.log({ result });
sendResponse(res, {
  statusCode: 200,
  success: true,
  message: 'Images uploaded successfully',
  data: result,
});
  },
);

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
const removeImage = handleAsyncRequest(async (req: Request, res: Response) => {
  const {publicId} = req.body; // <-- catch-all wildcard
  console.log('Deleting public ID:', publicId);


  if (!publicId) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Image public ID is required',
      data: null,
    });
  }

  const result = await deleteImageFromCloudinary(publicId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Image deleted successfully',
    data: result,
  });
});
export const UploadImageControllers = {
  uploadMultipleImages,
  removeImage
};
