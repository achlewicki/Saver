import { Component, OnInit } from '@angular/core';
import { CyclicService } from '#services/cyclic/cyclic.service';
import { CyclicModel } from '#models/cyclic.model';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { AddCyclicDialogComponent } from '#dialogs/add-cyclic-dialog/add-cyclic-dialog.component';

@Component({
  selector: 'svr-cyclic',
  templateUrl: './cyclic.component.html',
  styleUrls: ['./cyclic.component.scss']
})
export class CyclicComponent implements OnInit {
  protected cyclics: CyclicModel[];

  constructor(
    private readonly cyclicService: CyclicService,
    private readonly mainPageService: MainPageService,
    private readonly dialogs: MatDialog
  ) {
    this.mainPageService.activeView.next({
      name: 'cyclic',
      title: 'Raty i Cykliczne',
      icon: faHourglassHalf
    });
  }

  ngOnInit() {
    this.mainPageService.activeAccount.subscribe(account => {
      this.cyclics = [];
      this.cyclicService.getAllCyclics(account.id).subscribe(returnedCyclics => {
        this.cyclics = returnedCyclics;
        this.cyclics.sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());
      });
    });
  }

  protected openAddCyclicDialog() {
    const addDialog = this.dialogs.open(AddCyclicDialogComponent, {
      hasBackdrop: true,
      maxHeight: '850px',
      disableClose: true // with false there are issues with update
    });

    addDialog.afterClosed().subscribe(result => {
      if (result) { this.ngOnInit(); }
    });
  }

  protected deleteCyclic(cyclic: CyclicModel): void {
    this.cyclics.splice(this.cyclics.findIndex(value => value === cyclic), 1);
  }
}
