/**
 * @deprecated
 */

import { IMenuItem } from "../types/menu-item.type";

export const MockMenuItem_1 : IMenuItem = {
    id:'testID_1',
    title: 'MOET',
    description: 'Premium Champagne',
    price: 1800,
    category: 'bar',
    group: 'champagne'
}

export const MockMenuItem_2 : IMenuItem = {
    id:'testID_2',
    title: 'Coffee',
    description: 'Low-end cup of black goo',
    price: 200,
    category: 'bar',
    group: 'coffee'
}

export const MockMenuItem_3 : IMenuItem = {
    id:'testID_3',
    title: 'Steak',
    description: 'Premium ribeye cut',
    price: 2400,
    category: 'kitchen',
    group: 'premium meal'
}

export const MockMenuItem_4 : IMenuItem = {
    id:'testID_4',
    title: 'Chicken Parmesan',
    description: 'Gobble up !',
    price: 600,
    category: 'kitchen',
    group: 'meal'
}