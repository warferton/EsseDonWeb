/**
 * @interface
 * Describes a Basic Abstract Event
 */
export interface IEvent{
    id: string;
    title: string;
    lineup: string[];
    description: string;
    free: boolean;
    image: string;
    videoLink: string;
    price?: number | string;
}
