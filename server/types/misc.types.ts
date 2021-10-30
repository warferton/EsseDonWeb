export interface ImageFile{
    _id?: string;
    name: string;
    data: Buffer;
    size: number;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    md5: string;
    mv: Function;
}

export interface UploadableImage{
    _id?: string;
    name: string
    data: Buffer;
    size: number;
    encoding: string;
    mimetype: string;
}