import { UploadedFile } from "express-fileupload";

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
    free: boolean;
    deposit?: number | string;
    image: UploadedFile | string;
    videoLink?: string;
    price?: number | string;
    tcLink?: string; 
    group?: string;
    active: boolean;
}
