export interface IMenuItem{
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    group: string;
}

export interface IMenuItemGroup{
    name: string;
    items: IMenuItem[];
}