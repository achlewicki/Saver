import { SubcategoryModel } from './subcategory.model';
import { UserModel } from './user.model';

export interface TemplateModel {
    title: string;
    description: string;
    type: number;
    value: number;
    intoAccount: string;
    subcategory?: SubcategoryModel;
    user?: UserModel;
}
