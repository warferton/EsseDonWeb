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
    image: string;
    videoLink?: string;
    price?: number | string;
    tcLink?: string; 
    block?: string;
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