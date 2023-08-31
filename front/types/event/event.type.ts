/**
 * @interface
 * Describes a Basic Abstract Event
 */
export interface IEvent{
    _id: string;
    title: string;
    date: Date | string;
    time: string;
    lineup?: string[];
    shortDescription?: string;
    description: string;
    free: boolean | string;
    deposit?: number | string;
    image?: Image | string;
    videoLink?: string;
    price?: number | string;
    tcLink?: string; 
    group?: string;
    active: boolean | string;
}

export interface IUploadEvent{
    _id: string;
    title: string;
    date: Date | string;
    time: string;
    lineup?: string[];
    shortDescription?: string;
    description: string;
    free: boolean;
    deposit?: number | string;
    media: File | string;
    videoLink?: string;
    price?: number | string;
    tcLink?: string; 
    group?: string;
    active: boolean;
}

/**
 * @interface
 * Describes grouped events returned by a fetch operation
 */
export interface IEventGroups {
    mainGroupEvents : IEvent[];
    secondGroupEvents : IEvent[];
    generalGroupEvents : IEvent[];
}

export interface Image {
    _id?: string;
    name: string;
    data: Blob;
    size: number;
    encoding: string;
    tempFilePath?: string;
    truncated?: boolean;
    mimetype: string;
    md5?: string;
}