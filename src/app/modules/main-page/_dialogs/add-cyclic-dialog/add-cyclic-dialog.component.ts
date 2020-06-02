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
import {AccountService} from '#services/account-service/account.service';
import {CyclicModel} from '#models/cyclic.model';
import {CyclicService} from '#services/cyclic/cyclic.service';

@Component({
  selector: 'svr-add-operation-dialog',
  templateUrl: './add-cyclic-dialog.component.html',
  styleUrls: ['./add-cyclic-dialog.component.scss']
})
export class AddCyclicDialogComponent implements OnInit {

  protected closeIcon = faTimesCircle;
  protected plusIcon = faPlus;
  protected homeIcon = faHome;
  protected crossIcon = faTimes;
  protected howOftenOptions = [
    { number: 1, name: 'Codziennie' },
    { number: 3, name: 'Co 3 dni' },
    { number: 7, name: 'Co tydzień' },
    { number: 14, name: 'Co 2 tygodnie'},
    { number: 30, name: 'Co miesiąc' },
    { number: 90, name: 'Co 3 miesiące' }
  ];

  protected fGroup: FormGroup;
  protected errorMatcher = new BasicErrorStateMatcher();
  protected categories$: Observable<CategoryModel[]>;
  protected account: AccountModel;
  protected pendingAddCyclic: boolean;

  protected emptySubcategory: SubcategoryModel = {
    id: 0,
    color: '',
    title: 'Bez kategorii'
  };

  constructor(
    private readonly dialogRef: MatDialogRef<AddCyclicDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly mpService: MainPageService,
    private readonly cyclicService: CyclicService,
    private readonly accountService: AccountService
  ) {
    this.fGroup = this.fb.group({
      title: ['', Validators.required],
      value: ['', Validators.required],
      description: [''],
      subCategory: ['', Validators.required],
      howOften: ['', Validators.required]
    });

    this.pendingAddCyclic = false;

  }

  ngOnInit(): void {
    this.mpService.activeAccount.subscribe(result => this.account = result);
    this.categories$ = this.categoryService.getAllCategories();
  }

  protected closeDialog(added: boolean) {
    this.dialogRef.close(added);
  }

  protected submit(event): void {
    const button = event.submitter as HTMLElement;
    console.log(button.id);

    if (this.fGroup.valid) {
      const operationEnd = () => {
        this.pendingAddCyclic = false;
        this.fGroup.enable();
      };

      this.fGroup.disable();
      this.pendingAddCyclic = true;

      const value = parseFloat(this.fGroup.get('value').value);
      // const nextDateForModel: Date = this.fGroup.get('nextDate').value;
      // const endDateForModel: Date = this.fGroup.get('endDate').value;

      if (button.id === 'create-operation-button') {
        const subcategory = this.fGroup.get('subCategory').value;
        const howOftenOption = this.fGroup.get('howOften').value;
        const cyclic: CyclicModel = {
          title: this.fGroup.get('title').value,
          description: this.fGroup.get('description').value,
          type: value < 0 ? -1 : 1,
          value: value * (value < 0 ? -1 : 1),
          howOften: howOftenOption.number,
          intoAccount: 1,
          // subcategory: this.fGroup.get('subCategory').value,
          // endDate: endDateForModel
        };
        console.log(howOftenOption);

        this.cyclicService.addCyclic(this.account.id, subcategory.id, cyclic).subscribe( () => {
          operationEnd();
          this.closeDialog(true);
        });
      }
    }
  }
}
