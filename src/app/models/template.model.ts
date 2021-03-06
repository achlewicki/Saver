import { SubcategoryModel } from './subcategory.model';
import { UserModel } from './user.model';

export interface TemplateModel {
    id?: number;
    title: string;
    description: string;
    type: number;
    value: number;
    intoAccount: number;
    subcategory?: SubcategoryModel;
    user?: UserModel;
}
