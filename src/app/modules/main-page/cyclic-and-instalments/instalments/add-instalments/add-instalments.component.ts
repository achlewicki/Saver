import { CategoryService } from '#services/category-service/category.service';
import { SubcategoryModel } from '#models/subcategory.model';
import { AccountModel } from '#models/account.model';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { InstalmentElementModel, InstalmentExtendedModel, InstalmentDTO } from '#models/instalment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { InstalmentsService } from '#services/instalments-service/instalments.service';
import { CategoryModel } from '#models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'svr-add-instalments',
  templateUrl: './add-instalments.component.html',
  styleUrls: ['./add-instalments.component.scss']
})
export class AddInstalmentsComponent implements OnInit {
  @Output() public operationAdded = new EventEmitter<void>();

  protected fGroup: FormGroup;
  protected previewDates: InstalmentElementModel[];
  protected account: AccountModel;
  protected categories$: Observable<CategoryModel[]>;
  protected today = new Date();

  protected emptySubcategory: SubcategoryModel = {
    id: 0,
    color: '',
    title: 'Bez kategorii'
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly instalmentsService: InstalmentsService,
    private readonly mainPageService: MainPageService,
    private readonly categoryService: CategoryService
  ) {
    this.fGroup = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      totalValue: [0, [Validators.required, Validators.min(1)]],
      dateFrom: [new Date(), Validators.required],
      instalmentDates: [1, [Validators.required, Validators.min(1)]],
      subcategory: [this.emptySubcategory, Validators.required]
    });
  }

  ngOnInit(): void {
    this.previewDates = [];
    this.mainPageService.activeAccount.subscribe(
      account => this.account = account
    );
    this.categories$ = this.categoryService.getAllCategories();
  }

  protected submit(): void {
    console.log('validation');
    if (this.fGroup.valid) {
      console.log('submit');
      const dateTo = new Date(this.fGroup.get('dateFrom').value);
      dateTo.setMonth(dateTo.getMonth() + parseInt(this.fGroup.get('instalmentDates').value, 10));

      const subcategory = this.fGroup.get('subcategory').value as SubcategoryModel;
      console.log(subcategory);

      const newInstalment: InstalmentDTO = {
        title: this.fGroup.get('title').value,
        description: this.fGroup.get('description').value,
        dateFrom: this.fGroup.get('dateFrom').value,
        dateTo,
        value: parseFloat(this.fGroup.get('totalValue').value),
        numOfInstalment: this.fGroup.get('instalmentDates').value,
        intoAccount: 1
      };
      console.log(newInstalment.value);

      this.instalmentsService.addNewInstalment(newInstalment, this.account.id, subcategory.id).subscribe(
        result => {
          console.log('git');
          this.operationAdded.emit();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  protected calculateDates(): void {
    this.previewDates = [];
    const dateFrom = this.fGroup.get('dateFrom').value as Date;
    const instalmentDates = this.fGroup.get('instalmentDates').value as number;
    const partValue = this.fGroup.get('totalValue').value as number / instalmentDates;
    for (let i = 0; i < instalmentDates; i++) {
      const date = new Date(dateFrom);
      date.setMonth(dateFrom.getMonth() + i);
      this.previewDates.push({
        date,
        value: partValue,
        paid: false
      });
    }
  }
}
