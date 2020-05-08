import { EventService } from '#services/event-service/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventModel } from '#models/event.model';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { faChevronLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit, OnChanges {

  @Input()
  protected mode: 'add' | 'edit';

  @Input()
  protected event: EventModel;

  @Input()
  protected date: Date;

  @Input()
  protected accountId: number;

  @Output()
  protected eventAdded = new EventEmitter<EventModel>();

  @Output()
  protected eventModified = new EventEmitter<EventModel>();

  @Output()
  protected cancelAndReturn = new EventEmitter<void>();

  protected dateTo: Date;
  protected dateFrom: Date;
  protected color: string;

  protected fGroup: FormGroup;

  protected pendingOperation = false;
  protected operationSuccess = false;
  protected operationFail = false;

  protected backIcon = faChevronLeft;
  protected successIcon = faCheck;
  protected failIcon = faTimes;

  constructor(
    private readonly fb: FormBuilder,
    private readonly eventService: EventService
  ) { }

  ngOnInit(): void {
    this.dateTo = this.date || new Date();
    this.dateFrom = this.date || new Date();
    this.color = '#0681f8';

    this.fGroup = this.fb.group(
      {
        title: ['', Validators.required],
        dateFrom: [this.date, Validators.required],
        dateTo: [this.date, Validators.required],
        isRepeating: [false],
        repeatYearly: [false],
        description: [''],
        valueCheckbox: [false],
        value: [{ value: '', disabled: true }],
        reminderCheckbox: [false],
        remindDays: [{ value: '', disabled: true }]
      }
    );

    this.fGroup.get('valueCheckbox').valueChanges.subscribe(
      change => {
        const controler = this.fGroup.get('value');
        if (change) {
          controler.enable();
          controler.setValidators([
            Validators.required,
            // Validators.pattern('[0-9]*(\.[0-9]{1,2})?')
          ]);
        } else {
          controler.disable();
          controler.clearValidators();
        }
        controler.updateValueAndValidity();
      }
    );
    this.fGroup.get('reminderCheckbox').valueChanges.subscribe(
      change => {
        const controler = this.fGroup.get('remindDays');
        if (change) {
          controler.enable();
          controler.setValidators([
            Validators.required,
            Validators.pattern('[0-9]*')
          ]);
        } else {
          controler.disable();
          controler.clearValidators();
        }
        controler.updateValueAndValidity();
      }
    );

    if (this.mode === 'edit') {
      this.fGroup.get('title').setValue(this.event.title);
      this.fGroup.get('dateFrom').setValue(this.event.dateFrom);
      this.dateFrom = this.event.dateFrom;
      this.fGroup.get('dateTo').setValue(this.event.dateTo);
      this.dateTo = this.event.dateTo;
      this.fGroup.get('isRepeating').setValue(this.event.isRepeating);
      this.fGroup.get('description').setValue(this.event.description);
      if (this.event.value) {
        this.fGroup.get('valueCheckbox').setValue(true);
        this.fGroup.get('value').setValue(this.event.value);
      }
      if (this.event.whenNotification) {
        this.fGroup.get('reminderCheckbox').setValue(true);
        this.fGroup.get('remindDays').setValue(this.daysBetweenDates(this.event.whenNotification, this.event.dateFrom));
      }
      this.color = this.event.predefined ? '#01ca94' : this.event.color;
      if (this.event.predefined) {
        this.fGroup.get('title').disable();
        this.fGroup.get('dateFrom').disable();
        this.fGroup.get('dateTo').disable();
        this.fGroup.get('isRepeating').disable();
      }
    }

  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  protected submit(): void {
    if (this.fGroup.valid) {
      this.fGroup.disable();
      this.pendingOperation = true;

      const value: number =
        this.fGroup.get('value').value !== '' && this.fGroup.get('valueCheckbox').value
          ? parseFloat(parseFloat(this.fGroup.get('value').value).toFixed(2))
          : 0;
      const remindDays: number | null =
        this.fGroup.get('remindDays').value !== '' && this.fGroup.get('reminderCheckbox').value
          ? parseInt(this.fGroup.get('remindDays').value, 10)
          : null;

      const eventModel: EventModel = {
        title: this.fGroup.get('title').value,
        dateFrom: this.fGroup.get('dateFrom').value,
        dateTo: this.fGroup.get('dateTo').value,
        intoAccount: 1,
        description: this.fGroup.get('description').value,
        color: this.color,
        predefined: 0,
        isRepeating: this.fGroup.get('isRepeating').value,
        value
      };

      if (remindDays) {
        const notificationDate = new Date(eventModel.dateFrom);
        notificationDate.setDate(notificationDate.getDate() - remindDays);
        eventModel.whenNotification = notificationDate;
      } else {
        eventModel.whenNotification = null;
      }

      const onSuccess = (emiter: EventEmitter<EventModel>, result: EventModel) => {
        this.pendingOperation = false;
        this.operationSuccess = true;
        setTimeout(() => {
          emiter.emit(result);
        }, 1000);
        this.fGroup.enable();
      };

      const onFailure = (error: any) => {
        // console.error(error);
        this.pendingOperation = false;
        this.operationFail = true;
        this.fGroup.enable();
      };

      if (this.mode === 'add') {
        this.eventService.createEvent(eventModel, this.accountId).subscribe(
          result => {
            onSuccess(this.eventAdded, result);
          },
          err => {
            onFailure(err);
          }
        );
      } else if (this.mode === 'edit') {
        this.eventService.editEvent(eventModel, this.event.id).subscribe(
          result => {
            onSuccess(this.eventModified, result);
          },
          err => {
            onFailure(err);
          }
        );
      }
    }
  }

  protected returnToDefaultView(): void {
    this.cancelAndReturn.emit();
  }

  private daysBetweenDates(date1: Date, date2: Date): number {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }

}
