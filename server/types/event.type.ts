/**
 * @interface
 * Describes a Basic Abstract Event
 */
export interface IEvent{
    id: string;
    title: string;
    date: Date;
    time: string;
    lineup?: string[];
    description: string;
    shortdescription: string;
    free: boolean;
    image?: string;
    videoLink?: string;
    price?: number | string;
    deposit?: number | string;
    active: boolean;
}
