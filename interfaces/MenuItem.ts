export interface MenuItem {
    id: number;
    label: string;
    href: string;
    icon?: string;
    iconSelected?: string;
}
export interface MenuProps {
    menuItemList: MenuItem[];
    currentSelectedLabel: string;
}
export interface MenuItemMap {
    [key: string]: MenuItem;
}
  