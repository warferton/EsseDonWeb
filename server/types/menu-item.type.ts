/**
 * @interface
 * 
 * Describes a menu item to be put insibe menu section component
 */
export interface IMenuItem {
    id: string;
    title: string;
    description: string;
    price: number;
    category: 'bar' | 'kitchen'| 'wine' | 'special';
    group: string;
}
