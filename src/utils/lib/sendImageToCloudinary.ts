import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../../config';

import fs from 'fs';
import multer from 'multer';

cloudinary.config({
    cloud_name: config.cloudinaryName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });
  

  export const sendImageToCloudinary = (
    imageName: string,
    path: string,
    folderName: string | undefined | null,
  ): Promise<Record<string, unknown>> => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        path,
        {
          public_id: imageName,
          folder: folderName || config.cloudinaryImageFolderName,
        },
        function (error, result) {
          if (error) {
            reject(error);
          }
          resolve(result as UploadApiResponse);
          fs.unlink(path, (err) => {
            if (err) {
              reject(err);
            }
          });
        },
      );
    });
  };
  
  export const sendImagesToCloudinary = async (
    images: Express.Multer.File[], // Expecting multiple files
    folderName: string | undefined | null,
  ): Promise<string[]> => {
    try {
      const uploadPromises = images.map((image) => {
        return new Promise<string>((resolve, reject) => {
          const resourceType = image.mimetype.startsWith('image/')
            ? 'image'
            : 'video';
          cloudinary.uploader.upload(
            image.path,
            {
              public_id: image.filename, // Unique filename for Cloudinary
              folder: folderName || config.cloudinaryImageFolderName,
              resource_type: resourceType,
            },
            (error, result) => {
              // Remove file from local storage after upload
              fs.unlink(image.path, (err) => {
                if (err) {
                  console.error('Failed to delete local file:', err);
                }
              });
  
              if (error) {
                return reject(error);
              }
  
              resolve(result?.secure_url || '');
            },
          );
        });
      });
  
      // Wait for all images to upload
      const results = await Promise.all(uploadPromises);
      // console.log('All uploads completed:', results);
      return results;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw new Error('Failed to upload images.');
    }
  };

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = process.cwd() + '/uploads/';
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

  export const upload = multer({
    storage: storage,
    fileFilter:(req, file, cb)=>{
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'video/mp4',
            'video/webm',
            'video/quicktime',
          ];
          if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
          } else{
            cb(new Error('Invalid file type. Only images and videos are allowed.'))
          }
    }
  })

  export default cloudinary;