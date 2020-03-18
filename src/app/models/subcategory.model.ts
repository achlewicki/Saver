import { Category } from './category.model';

export interface Subcategory {
    id: number;
    title: string;
    color: string;
    category?: Category;
}
