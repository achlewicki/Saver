import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CategoryModel } from '#models/category.model';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'svr-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {

  @Input()
  protected categories: CategoryModel[];

  @Output()
  public markedSubcategoriesChange = new EventEmitter<number[]>();

  private markedSubcategories: number[] = [];

  protected expandIcon = faChevronRight;

  protected treeControl: FlatTreeControl<TreeNode>;
  protected treeFlattener: MatTreeFlattener<CategoryTreeModel, TreeNode>;
  protected dataSource: MatTreeFlatDataSource<CategoryTreeModel, TreeNode>;

  protected checkboxSelection = new SelectionModel<TreeNode>(true);

  constructor() {

    this.treeControl = new FlatTreeControl<TreeNode>(
      node => node.level,
      node => node.expandable
    );

    this.treeFlattener = new MatTreeFlattener<CategoryTreeModel, TreeNode>(
      this.transformer,
      (node: TreeNode) => node.level,
      (node: TreeNode) => node.expandable,
      (node: CategoryTreeModel) => node.children
    );

    this.dataSource = new MatTreeFlatDataSource<CategoryTreeModel, TreeNode>(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.dataSource.data = this.categories.map(
      element => {
        return {
          id: element.id,
          name: element.title,
          children: element.subcategories.map(
            subcategory => {
              return {
                id: subcategory.id,
                name: subcategory.title,
              };
            })
        };
      }
    );
    this.checkboxSelection.changed.subscribe(
      node => {
        const added = node.added.filter(value => value.level > 0).map(element => element.id);
        const removed = node.removed.filter(value => value.level > 0).map(element => element.id);
        if (added.length > 0) {
          this.markedSubcategories.push(...added);
          this.markedSubcategoriesChange.emit(this.markedSubcategories);
        }
        if (removed.length > 0) {
          removed.forEach(
            element => {
              const index = this.markedSubcategories.indexOf(element);
              this.markedSubcategories.splice(index, 1);
            }
          );
          this.markedSubcategoriesChange.emit(this.markedSubcategories);
        }
      }
    );
  }

  protected hasChild(_: number, node: TreeNode): boolean {
    return node.expandable;
  }

  private transformer(item: CategoryTreeModel, level: number): TreeNode {
    return {
      id: item.id,
      name: item.name,
      level,
      expandable: !!item.children && item.children.length > 0
    };
  }

  protected allSubcategoriesSelected(node: TreeNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checkboxSelection.isSelected(child)
    );
    return descAllSelected;
  }

  protected subcategoriesPartiallySelected(node: TreeNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checkboxSelection.isSelected(child));
    return result && !this.allSubcategoriesSelected(node);
  }

  protected subcategorySelectionToggle(node: TreeNode): void {
    this.checkboxSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  protected categorySelectionToggle(node: TreeNode): void {
    this.checkboxSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    if (this.checkboxSelection.isSelected(node)) {
      this.checkboxSelection.select(...descendants);
    } else {
      this.checkboxSelection.deselect(...descendants);
    }

    descendants.every(child =>
      this.checkboxSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: TreeNode): void {
    let parent: TreeNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: TreeNode): void {
    const nodeSelected = this.checkboxSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checkboxSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checkboxSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checkboxSelection.select(node);
    }
  }

  getParentNode(node: TreeNode): TreeNode | null {
    const currentLevel = node.level;

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}

interface TreeNode {
  id: number;
  name: string;

  expandable: boolean;
  level: number;
}

interface CategoryTreeModel {
  id: number;
  name: string;
  children?: CategoryTreeModel[];
}
