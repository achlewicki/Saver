import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { InstalmentsService } from '#services/instalments-service/instalments.service';
import { InstalmentExtendedModel, InstalmentElementModel, InstalmentBasicModel } from '#models/instalment.model';
import { faCoins, faBookmark, faAlignLeft, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { ProcessDialogData, ProcessDialogComponent } from '#dialogs/process-dialog/process-dialog.component';



@Component({
  selector: 'svr-instalments-list-details',
  templateUrl: './instalments-list-details.component.html',
  styleUrls: ['./instalments-list-details.component.scss']
})
export class InstalmentsListDetailsComponent implements OnChanges {
  @Input() public instalmentId: number;
  @Output() public instalmentDeleted = new EventEmitter<void>();

  protected instalment$: Observable<InstalmentExtendedModel>;

  protected coinsIcon = faCoins;
  protected titleIcon = faBookmark;
  protected descriptionIcon = faAlignLeft;
  protected timeIcon = faHourglassHalf;

  constructor(
    private readonly instalmentsService: InstalmentsService,
    private readonly dialogs: MatDialog
  ) { }

  ngOnChanges(): void {
    if (this.instalmentId) {
      this.instalment$ = this.instalmentsService.getInstalmentInfo(this.instalmentId);
    }
  }

  protected getNextPayment(instalment: InstalmentExtendedModel): InstalmentElementModel {
    return instalment.elements.find(element => element.paid === false);
  }

  protected removeInstalment(instalment: InstalmentBasicModel): void {
    const processDialogData: ProcessDialogData = {
      title: 'Czy na pewno chcesz anulować kredyt?',
      initializeMessage: '',
      successMessage: 'Kredyt został usunięty',
      failureMessage: 'Wystąpił błąd podczas anulowania kredytu',
      process: this.instalmentsService.removeInstalment(instalment)
    };
    const processDialog = this.dialogs.open<ProcessDialogComponent, ProcessDialogData, any | null>(ProcessDialogComponent, {
      data: processDialogData
    });
    processDialog.afterClosed().subscribe(
      result => {
        if (result) {
          this.instalmentDeleted.emit();
        }
      }
    );
  }

}
