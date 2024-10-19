import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { TicketService } from 'src/app/shared/services';
import notify from 'devextreme/ui/notify';
import { Ticket } from 'src/app/shared/services/tickets/ticket.model';
import {
  NomenclatureService,
  TicketStatus,
} from 'src/app/shared/services/nomenclature.service';

@Component({
  templateUrl: 'tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  nomenclatureService = NomenclatureService;
  dataSource: any;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.dataSource = new CustomStore({
      key: 'id',
      load: async () => await this.ticketService.GetTickets().then((result) => result.data),
      // load: async () => {
      //   const result = await this.ticketService
      //     .GetTickets()
      //     .then((result) => {
      //       if (result.isOk) {
      //         return result.data;
      //       } else {
      //         notify('Error loading tickets 😥', 'error', 2000);
      //         return [];
      //       }
      //     })
      //     .catch((error) => {
      //       notify('Error loading tickets 😥', 'error', 2000);
      //       return [];
      //     });
      // },
      insert: async (values) => {
        const payload: Ticket = {
          Description: values['description'] || '',
          Status: values['status'] || TicketStatus.Open,
          CreatedAt: new Date(),
        };

        try {
          const result = await this.ticketService.AddTicket(payload);
          notify(result.message, result.isOk ? 'success' : 'error', 2000);
        } catch (error) {
          notify('Error adding ticket 😥', 'error', 2000);
        }

        return values;
      },
      update: async (key, values) => {
        try {
          const existingTicket = await this.ticketService
            .GetTicket(key)
            .then((result) => result.data);

          const payload: Ticket = {
            Id: key,
            Description:
              values['description'] !== undefined
                ? values['description']
                : existingTicket.description,
            Status:
              values['status'] !== undefined
                ? values['status']
                : existingTicket.status,
            CreatedAt: existingTicket.createdAt,
          };

          const result = await this.ticketService.EditTicket(key, payload);
          notify(result.message, result.isOk ? 'success' : 'error', 2000);
        } catch (error) {
          notify(`Error updating ticket #${key} 😥`, 'error', 2000);
        }

        return values;
      },
      remove: async (key) => {
        try {
          const result = await this.ticketService.RemoveTicket(key);
          notify(result.message, result.isOk ? 'success' : 'error', 2000);
        } catch (error) {
          notify(`Error removing ticket #${key} 😥`, 'error', 2000);
        }
      },
    });
  }

  /**
   * Initializes default values when a new row is added in the grid
   * @param e - The event containing the new row's data
   */
  initNewRow(e: any) {
    e.data.id = '####'; // Placeholder ID until saved in the backend
    e.data.status = TicketStatus.Open;
    e.data.createdAt = new Date();
  }
}
