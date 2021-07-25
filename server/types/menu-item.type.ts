/**
 * @interface
 * 
 * Describes a memnu item to be put insibe menu section component
 */
export interface IMenuItem {
    id: string;
    title: string;
    description: string;
    price: number;
    category: 'bar' | 'kitchen'| 'vegan' | 'special';
    group: string;
}