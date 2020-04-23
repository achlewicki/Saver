import { OperationModel } from '#models/operations.model';
import { OperationsService } from '#services/operations-service/operations.service';
import { AccountModel } from '#models/account.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicErrorStateMatcher } from '#modules/shared/error-matchers/basic.error-state-matcher';
import { CategoryModel } from '#models/category.model';
import { CategoryService } from '#services/category-service/category.service';
import { MainPageService } from '#services/main-page-service/main-page.service';

@Component({
  selector: 'svr-add-operation-dialog',
  templateUrl: './add-operation-dialog.component.html',
  styleUrls: ['./add-operation-dialog.component.scss']
})
export class AddOperationDialogComponent implements OnInit {

  protected closeIcon = faTimesCircle;
  protected plusIcon = faPlus;
  protected homeIcon = faHome;

  protected fGroup: FormGroup;
  protected errorMatcher = new BasicErrorStateMatcher();
  protected categories: Observable<CategoryModel[]>;
  protected account: AccountModel;
  protected pendingAddOperation: boolean;

  constructor(
    private readonly dialogRef: MatDialogRef<AddOperationDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly mpService: MainPageService,
    private readonly opService: OperationsService
  ) {
    this.fGroup = this.fb.group({
      title: ['', Validators.required],
      value: ['', Validators.required],
      description: [''],
      subCategory: ['', Validators.required],
      file: [''],
      guarranty: ['']
    });

    this.pendingAddOperation = false;
  }

  ngOnInit(): void {
    this.mpService.activeAccount.subscribe(
      result => this.account = result
    );
    this.categories = this.categoryService.getAllCategories();
  }

  protected closeDialog() {
    // TODO Prevent from closing when form is dirty - Dialog
    this.dialogRef.close();
  }

  protected submit(): void {
    const operationEnd = () => {
      this.pendingAddOperation = false;
      this.fGroup.enable();
    };

    if (this.fGroup.valid) {
      this.fGroup.disable();
      this.pendingAddOperation = true;

      const value = parseInt(this.fGroup.get('value').value, 10);
      const operation: OperationModel = {
        title: this.fGroup.get('title').value,
        description: this.fGroup.get('description').value,
        type: value < 0 ? -1 : 1,
        value: value * (value < 0 ? -1 : 1),
        date: new Date(),
        intoAccount: 'YES',
        subcategory: this.fGroup.get('subCategory').value,
        distinction: 'regular'
      };
      this.opService.addOperation(this.account.id, operation).subscribe(
        res => {
          // TODO - Completed Dialog
          console.log(res);
          alert('Pomyślnie dodano operacje: ' + operation.title);
          operationEnd();
          this.mpService.operationAdded.next(res);
        },
        err => {
          // TODO - Error Dialog
          console.error(err);
          alert('Wystąpił błąd podczas dodawania oepracji: ' + err.error);
          operationEnd();
        }
      );
    }
  }
}
