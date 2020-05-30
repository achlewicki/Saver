import { SubcategoryModel } from '#models/subcategory.model';
import { OperationModel } from '#models/operations.model';
import { OperationsService } from '#services/operations-service/operations.service';
import { AccountModel } from '#models/account.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faHome, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicErrorStateMatcher } from '#modules/shared/error-matchers/basic.error-state-matcher';
import { CategoryModel } from '#models/category.model';
import { CategoryService } from '#services/category-service/category.service';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { TemplateModel } from '#models/template.model';
import { TemplateService } from '#services/template-service/template.service';

@Component({
  selector: 'svr-add-operation-dialog',
  templateUrl: './add-operation-dialog.component.html',
  styleUrls: ['./add-operation-dialog.component.scss']
})
export class AddOperationDialogComponent implements OnInit {

  protected closeIcon = faTimesCircle;
  protected plusIcon = faPlus;
  protected homeIcon = faHome;
  protected crossIcon = faTimes;

  protected fGroup: FormGroup;
  protected errorMatcher = new BasicErrorStateMatcher();
  protected categories$: Observable<CategoryModel[]>;
  protected templates$: Observable<TemplateModel[]>;
  protected lastOperations$: Observable<OperationModel[]>;
  protected account: AccountModel;
  protected pendingAddOperation: boolean;

  protected emptySubcategory: SubcategoryModel = {
    id: 0,
    color: '',
    title: 'Bez kategorii'
  };

  constructor(
    private readonly dialogRef: MatDialogRef<AddOperationDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly mpService: MainPageService,
    private readonly operationsService: OperationsService,
    private readonly templateService: TemplateService
  ) {
    this.fGroup = this.fb.group({
      title: ['', Validators.required],
      value: ['', Validators.required],
      description: [''],
      subCategory: ['', Validators.required],
      // file: [''],
      guarranty: ['']
    });

    this.pendingAddOperation = false;

  }

  ngOnInit(): void {
    this.mpService.activeAccount.subscribe(
      result => {
        this.account = result;
        this.getLastOperations(this.account.id);
        this.getTemplates();
      }
    );
    this.mpService.operationAdded.subscribe(
      () => this.getLastOperations(this.account.id));
    this.categories$ = this.categoryService.getAllCategories();
  }

  protected closeDialog() {
    this.dialogRef.close();
  }

  protected setOperationWithTempalte(template: TemplateModel): void {
    this.fGroup.setValue({
      title: template.title,
      value: template.value * template.type,
      description: template.description,
      subCategory: template.subcategory,
      guarranty: ''
    });
  }

  protected setOperationWithLastOperation(operation: OperationModel): void {
    this.fGroup.setValue({
      title: operation.title,
      value: operation.value * operation.type,
      description: operation.description,
      subCategory: operation.subcategory,
      guarranty: operation.guarantyDays
    });
  }

  protected deleteTemplate(template: TemplateModel): void {
    this.templateService.deleteTemplate(template).subscribe(
      () => this.getTemplates()
    );
  }

  protected submit(event): void {
    const button = event.submitter as HTMLElement;
    console.log(button.id);

    if (this.fGroup.valid) {
      const operationEnd = () => {
        this.pendingAddOperation = false;
        this.fGroup.enable();
      };

      this.fGroup.disable();
      this.pendingAddOperation = true;

      const value = parseFloat(this.fGroup.get('value').value);

      if (button.id === 'create-operation-button') {

        const operation: OperationModel = {
          title: this.fGroup.get('title').value,
          description: this.fGroup.get('description').value,
          type: value < 0 ? -1 : 1,
          value: value * (value < 0 ? -1 : 1),
          date: new Date(),
          intoAccount: 'YES',
          subcategory: this.fGroup.get('subCategory').value,
          distinction: 'regular',
          guarantyDays: parseInt(this.fGroup.get('guarranty').value, 10) || 0
        };
        this.operationsService.addOperation(this.account.id, operation).subscribe(
          result => {
            // TODO - Completed Dialog
            console.log(result);
            alert('Pomyślnie dodano operacje: ' + operation.title);
            operationEnd();
            this.mpService.operationAdded.next(result);
            this.mpService.refreshActiveAccount();
          },
          error => {
            // TODO - Error Dialog
            console.error(error);
            alert('Wystąpił błąd podczas dodawania oepracji: ' + error.error);
            operationEnd();
          }
        );
      }

      if (button.id === 'create-template-button') {
        const template: TemplateModel = {
          title: this.fGroup.get('title').value,
          description: this.fGroup.get('description').value,
          type: value < 0 ? -1 : 1,
          value: value * (value < 0 ? -1 : 1),
          intoAccount: 'YES',
          subcategory: this.fGroup.get('subCategory').value
        };

        this.templateService.createTemplate(template).subscribe(
          result => {
            this.getTemplates();
            operationEnd();
          },
          error => {
            operationEnd();
          }
        );
      }
    }

  }


  private getTemplates(): void {
    this.templates$ = this.templateService.getTemplatesForUser(parseInt(localStorage.getItem('user.id'), 10));
  }

  private getLastOperations(accountId: number): void {
    this.lastOperations$ = this.operationsService.getOperationsByAccount(
      accountId,
      {
        length: 3,
        startIndex: 0,
        type: ['regular']
      }
    );
  }
}
