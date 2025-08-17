import {v2 as cloudinary, UploadApiResponse} from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export enum CloudinaryPreset {
    RECIPE_IMAGE = 'recipe_cover_preset',
}

export const uploadFile = (file: File, preset: CloudinaryPreset, folder = 'recipe_cover') => new Promise<UploadApiResponse|undefined>(async (resolve, reject) => {
    const buffer = await file.arrayBuffer();

    cloudinary.uploader.upload_stream({
        upload_preset: preset,
        folder,
    },(error, result) => {
        if(error) return reject(error);
        return resolve(result)
    }).end(Buffer.from(buffer));
});

export const uploadFiles = async (files: File[], preset: CloudinaryPreset) => {
    return Promise.all(files.map(file => uploadFile(file, preset, 'recipe_steps')))
        .then(results => results.filter(result => result !== undefined));
}

export {cloudinary}