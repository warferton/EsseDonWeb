/**
 * @interface
 * Describes a Basic Abstract Event
 */
interface IEvent{
    title: string;
    description: string;
    image: ImageBitmap;
}

/**
 * @interface
 */
export interface IPayedEvent extends IEvent {
    free: false; // ??
    price: number;
}

/**
 * @interface
 */
export interface IFreeEvent extends IEvent {
    free: true; // ??
}