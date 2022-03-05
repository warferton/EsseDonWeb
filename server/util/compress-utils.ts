import sharp from "sharp";
import { ImageFile, UploadableImage } from "../types/misc.types";

    export async function compressImg(rawImage : ImageFile | UploadableImage) {
        const comressed = await sharp(rawImage.data)
        .resize({
            width: 1280,
            height: 720
        })
        .jpeg({
            quality: 85,
            mozjpeg: true, 
        })
        .toBuffer();
        return comressed;
    }

    export async function toUploadableImage(imageFile : ImageFile) {
        const { name, data, size, encoding, mimetype } = imageFile;
        const uploadable = { name, data, size, encoding, mimetype };
        uploadable.name = `${new Date().toISOString()}-jazz-${name}`;
        const res = await compressImg(uploadable);
        uploadable.data = res;
        uploadable.size = res.length;
        uploadable.mimetype = 'image/jpeg';
        return uploadable;
    }

    export function inferImageFileType(imageFile: ImageFile) {
        //if has md5 hash and filepath -> ImageFile type
        if(imageFile.tempFilePath && imageFile.md5) {
            return imageFile as ImageFile;
        } else {
            return imageFile as UploadableImage;
        }
    }
