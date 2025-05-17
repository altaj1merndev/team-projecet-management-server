import { Request, Response } from 'express';
import handleAsyncRequest from '../../utils/share/handleAsyncRequest';
import { sendImagesToCloudinary } from '../../utils/lib/sendImageToCloudinary';
import sendResponse from '../../utils/share/sendResponse';


const uploadMultipleImages = handleAsyncRequest(
  async (req: Request, res: Response) => {
    // console.log('uploadMultipleImages controller called');
    const files = req.files as Express.Multer.File[];
    // console.log('Number of files received:', files ? files.length : 0);

    const result = await sendImagesToCloudinary(files, req.params?.folder);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Images uploaded successfully',
      data: result,
    });
  },
);

export const UploadImageControllers = {
  uploadMultipleImages,
};
