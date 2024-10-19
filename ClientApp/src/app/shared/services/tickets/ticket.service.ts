import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiClient } from '../http/api-client';
import { Ticket } from './ticket.model';
import { HttpResult } from '../http/http-result.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly MAIN_ENDPOINT = `Tickets/`;

  constructor(private apiClient: ApiClient) {}

  /**
   * Fetches all tickets from the server.
   * @returns {Promise<HttpResult>} Result of the HTTP request with success or error message.
   */
  async GetTickets(): Promise<HttpResult> {
    let result = new HttpResult();

    await firstValueFrom(this.apiClient.get(`${this.MAIN_ENDPOINT}`))
      .then((data: any) => {
        result = new HttpResult(
          true,
          data,
          'Successfully retrieved tickets 💯'
        );
      })
      .catch((err) => {
        result = result.handleError(err, 'Error retrieving tickets 😥');
      });

    return result;
  }

  /**
   * Fetches all tickets from the server.
   * @returns {Promise<HttpResult>} Result of the HTTP request with success or error message.
   */
  async GetTicket(id: number): Promise<HttpResult> {
    let result = new HttpResult();

    await firstValueFrom(this.apiClient.get(`${this.MAIN_ENDPOINT}${id}`))
      .then((data: any) => {
        result = new HttpResult(
          true,
          data,
          `Successfully retrieved ticket with ID #${id} 💯`
        );
      })
      .catch((err) => {
        result = result.handleError(err, `Error retrieving ticket with ID #${id} 😥`);
      });

    return result;
  }

  /**
   * Adds a new ticket.
   * @param {Ticket} payload - The ticket data to be added.
   * @returns {Promise<HttpResult>} Result of the HTTP request with success or error message.
   */
  async AddTicket(payload: Ticket): Promise<HttpResult> {
    let result = new HttpResult();

    await firstValueFrom(this.apiClient.post(`${this.MAIN_ENDPOINT}`, payload))
      .then(() => {
        result = new HttpResult(true, null, 'Ticket added successfully 💯');
      })
      .catch((err) => {
        result = result.handleError(err, 'Error adding ticket 😥');
      });

    return result;
  }

  /**
   * Updates an existing ticket.
   * @param {number} key - The ID of the ticket to be updated.
   * @param {Ticket} payload - The updated ticket data.
   * @returns {Promise<HttpResult>} Result of the HTTP request with success or error message.
   */
  async EditTicket(key: number, payload: Ticket): Promise<HttpResult> {
    let result = new HttpResult();

    await firstValueFrom(
      this.apiClient.put(`${this.MAIN_ENDPOINT}${key}`, payload)
    )
      .then(() => {
        result = new HttpResult(true, null, `Ticket with ID #${key} updated successfully 💯`);
      })
      .catch((err) => {
        result = result.handleError(err, `Error updating ticket with ID #${key} 😥`);
      });

    return result;
  }

  /**
   * Removes a ticket by its ID.
   * @param {any} id - The ID of the ticket to be removed.
   * @returns {Promise<HttpResult>} Result of the HTTP request with success or error message.
   */
  async RemoveTicket(id: any): Promise<HttpResult> {
    let result = new HttpResult();

    await firstValueFrom(this.apiClient.delete(`${this.MAIN_ENDPOINT}${id}`))
      .then(() => {
        result = new HttpResult(true, null, `Ticket with ID #${id} removed successfully 💯`);
      })
      .catch((err) => {
        result = result.handleError(err, `Error removing ticket with ID #${id} 😥`);
      });

    return result;
  }
}
