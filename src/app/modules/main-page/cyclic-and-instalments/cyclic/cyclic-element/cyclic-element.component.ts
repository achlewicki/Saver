import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faAlignLeft, faHourglassHalf, faTrash, faCoins, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {CyclicModel} from '#models/cyclic.model';
import {CyclicService} from '#services/cyclic/cyclic.service';
import {MainPageService} from '#services/main-page-service/main-page.service';
import {ProcessDialogComponent, ProcessDialogData} from '#dialogs/process-dialog/process-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'svr-cyclic-element',
  templateUrl: './cyclic-element.component.html',
  styleUrls: ['./cyclic-element.component.scss']
})
export class CyclicElementComponent implements OnInit {
  @Input() protected cyclic: CyclicModel;
  @Output() public deletedCyclic = new EventEmitter<CyclicModel>();
  protected descriptionBoxVisible = false;
  protected descriptionIcon = faAlignLeft;
  protected nextCyclicIcon = faHourglassHalf;
  protected trashIcon = faTrash;
  protected coinsIcon = faCoins;
  protected dropIcon = faChevronDown;

  constructor(
    private readonly cyclicService: CyclicService,
    private readonly mainPageService: MainPageService,
    private readonly dialogs: MatDialog,
  ) { }

  ngOnInit() {
  }

  private deleteCyclic(): void {
    const processDialogData: ProcessDialogData = {
      title: 'Czy na pewno chcesz usunąć operację cykliczna "' + this.cyclic.title + '"?',
      initializeMessage: 'Nie będzie można odzyskać informacji o tej operacji cyklicznej. Wszystkie transakcje związane z nią zostaną zachowane.',
      successMessage: 'Operacja cykliczna została usunięta',
      failureMessage: 'Wystąpił błąd podczas usuwania operacji cyklicznej',
      process: this.cyclicService.deleteCyclic(this.cyclic.id)
    };
    const processDialog = this.dialogs.open<ProcessDialogComponent, ProcessDialogData, any | null>(ProcessDialogComponent, {
      data: processDialogData
    });
    processDialog.afterClosed().subscribe(
      result => {
        if (result) {
          this.deletedCyclic.emit(this.cyclic);
        }
      }
    );
  }

  protected descriptionClick(): void {
    this.descriptionBoxVisible = !this.descriptionBoxVisible;
  }
}
