// Enum to map the ticket status codes
export enum TicketStatus {
  Open = 1,
  Closed = 2
}

export class NomenclatureService {
  // Ticket Status with ids and human-readable values (Label)
  static TicketStatus = {
    Open: { id: TicketStatus.Open, value: 'Open' },
    Closed: { id: TicketStatus.Closed, value: 'Closed' }
  };

  /**
   * Gets the value (human-readable label) corresponding to the provided id.
   * @param enumObject - The enum object containing id-value pairs.
   * @param id - The id to find the corresponding value for.
   * @returns The value if found, otherwise null.
   */
  static toString(enumObject: Record<string, { id: number; value: string }>, id: number | string): string | null {
    const found = Object.values(enumObject).find(item => item.id == id);
    return found ? found.value : null;
  }

  /**
   * Converts any enum object into an array of { id, value } objects (for use in dropdowns).
   * @param enumObject - The enum object containing id-value pairs.
   * @returns An array of id-value pairs representing enum values.
   */
  static getDataSource(enumObject: Record<string, { id: number; value: string }>): Array<{ id: number; value: string }> {
    return Object.values(enumObject).map(item => ({
      id: item.id,
      value: item.value
    }));
  }
}
