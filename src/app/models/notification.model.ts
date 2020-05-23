import {EventModel} from '#models/event.model';

export interface NotificationModel {
  id: number;
  type: string;
  title: string;
  date: Date;
  description: string;
  seen: boolean;
  event: EventModel;
}
