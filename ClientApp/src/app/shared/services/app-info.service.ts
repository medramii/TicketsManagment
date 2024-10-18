import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Tickets Managment System';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
