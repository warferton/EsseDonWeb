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
    image: string;
    videoLink?: string;
    price?: number | string;
    tcLink?: string; 
    block?: string;
}
