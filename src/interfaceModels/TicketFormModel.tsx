import { FormInputModel } from './FormInputModel';

export interface TicketFormModel {
    ticketDescription: FormInputModel;
    createdBy: FormInputModel;
    status: FormInputModel;
    createdAt: FormInputModel;
}
