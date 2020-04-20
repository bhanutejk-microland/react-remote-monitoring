import { TicketModel } from './TicketModel';

export interface TicketsInfoModel {
  tickets: Array<TicketModel>;
  totalTickets: number;
  openTickets: number;
  closedTickets: number;
  pendingTickets: number;
}
