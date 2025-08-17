import {v2 as cloudinary, UploadApiResponse} from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const uploadFile = (file: File) => new Promise<UploadApiResponse|undefined>(async (resolve, reject) => {
    const buffer = await file.arrayBuffer();

    cloudinary.uploader.upload_stream((error, result) => {
        if(error) return reject(error);
        return resolve(result)
    }).end(Buffer.from(buffer));
});

export {cloudinary}