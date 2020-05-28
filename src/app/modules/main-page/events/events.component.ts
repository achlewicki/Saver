import { ActivatedRoute } from '@angular/router';
import { AppMessageDialogComponent, AppMessageDialogData } from '#dialogs/app-message-dialog/app-message-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '#dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { EventModel } from '#models/event.model';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl';
import { EventInput, Calendar } from '@fullcalendar/core';
import { EventService } from '#services/event-service/event.service';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { setFontColorWithContrast } from '#utilities/color-functions';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'svr-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, AfterViewChecked {

  @ViewChild('calendar', { static: false })
  private calendarComponent: FullCalendarComponent;

  private calendarApi: Calendar;

  protected accountId: number;

  protected detailsBoxState: 'show-event' | 'add-event' | 'edit-event' | 'default' = 'default';
  protected calendarPlugins = [dayGridPlugin, interactionPlugin];
  protected calendarEvents: EventInput[];
  protected plLocale = plLocale;

  protected selectedEvent: EventModel;
  protected selectedDate: Date;
  protected operationPending = false;

  protected calendarIcon = faCalendarAlt;
  private eventIdParam: number;

  constructor(
    private readonly mpService: MainPageService,
    private readonly eventsService: EventService,
    private readonly dialogs: MatDialog,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mpService.activeView.next({
      name: 'calendar',
      title: 'Kalendarz',
      icon: faCalendarAlt
    });
    this.eventIdParam = parseInt(this.route.snapshot.queryParamMap.get('eventId'), 10);
    this.getEvents();
  }

  ngAfterViewChecked(): void {
    this.calendarApi = this.calendarComponent.getApi();
  }

  protected dateClick(eventArg): void {
    this.detailsBoxState = 'add-event';
    this.selectedDate = eventArg.date;
  }

  protected eventClick(eventArg): void {
    this.getEventDetails(eventArg.event.id);
  }

  protected setEditState(): void {
    this.detailsBoxState = 'edit-event';
  }

  protected eventAddedHandler(event: EventModel): void {
    this.getEvents();
    this.selectedEvent = event;
    this.detailsBoxState = 'show-event';
  }

  protected eventEditedHandler(event: EventModel): void {
    this.getEvents();
    this.selectedEvent = event;
    this.detailsBoxState = 'show-event';
  }

  protected eventDeleteHandler(): void {
    const confirmDialog = this.dialogs.open<ConfirmDialogComponent, ConfirmDialogData, boolean>(
      ConfirmDialogComponent, {
      data: new ConfirmDialogData(
        'Czy na pewno chcesz usunąć to wydarzenie?',
        'question',
        {
          cancelText: 'Anuluj',
          submitText: 'Usuń'
        }
      )
    });
    confirmDialog.afterClosed().subscribe(
      result => {
        if (result) {
          this.operationPending = true;
          this.eventsService.deleteEvent(this.selectedEvent.id).subscribe(
            success => {
              this.getEvents();
              this.selectedEvent = null;
              this.operationPending = false;
            },
            error => {
              this.operationPending = false;
              this.dialogs.open<AppMessageDialogComponent, AppMessageDialogData, void>(
                AppMessageDialogComponent, {
                data: new AppMessageDialogData(
                  'failure',
                  'Nie udało się usunąć konta'
                ),
              });
            }
          );
        }
      }
    );
  }

  protected cancelEditing(): void {
    if (this.selectedEvent) {
      this.detailsBoxState = 'show-event';
    } else {
      this.detailsBoxState = 'default';
    }
  }

  private getEvents(): void {
    this.mpService.activeAccount.subscribe(account => {
      this.calendarEvents = [];
      this.accountId = account.id;
      this.eventsService.getEvents(this.accountId).subscribe(
        result => {
          this.calendarEvents = result.map(
            (element) => {
              return {
                id: element.id,
                title: element.title,
                start: element.dateFrom,
                end: new Date(element.dateTo.getTime() + (1000 * 3600 * 24)),
                backgroundColor: element.predefined ? '#01ca94' : element.color,
                borderColor: element.predefined ? 'red' : element.color,
                textColor: setFontColorWithContrast(element.predefined ? '#01ca94' : element.color),
                allDay: true
              };
            }
          );
          if (this.eventIdParam) {
            const eventId = this.calendarEvents.find((element) => element.id === this.eventIdParam);
            if (eventId) {
              this.getEventDetails(this.eventIdParam);
              this.calendarApi.gotoDate(eventId.start);
              this.eventIdParam = null;
            }
          }
        }
      );
      this.detailsBoxState = 'default';
    });
  }

  private getEventDetails(eventId: number): void {
    this.operationPending = true;
    this.eventsService.getEventDetails(eventId).subscribe(
      event => {
        this.selectedEvent = event;
        this.operationPending = false;
        this.detailsBoxState = 'show-event';
      }
    );
  }

}
