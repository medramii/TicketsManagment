import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from './user.model';
import { firstValueFrom } from 'rxjs';
import { ApiClient } from '../api-client';

const defaultPath = '/';

@Injectable()
export class AuthService {
  private MAIN_ENDPOINT = `Authentication/Login`;
  private _user?: User | null;

  get loggedIn(): boolean {
    try {
      const userJson = localStorage.getItem('SignedUser');
      if (userJson) {
        try {
          const userObject = JSON.parse(userJson);
          this._user = userObject as User | null;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          this._user = null;
        }
      } else {
        this._user = null;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private apiClient: ApiClient, private router: Router) {}

  async logIn(payload: User) {
    let result = {
      isOk: false,
      data: 'error...',
      message: 'Authentication failed',
    };

    await firstValueFrom(
      this.apiClient.post(`${this.MAIN_ENDPOINT}`, {
        username: payload.username,
        password: payload.password,
      })
    )
      .then((data: any) => {
        localStorage.setItem('SignedUser', JSON.stringify(data.authenticatedUser));
        localStorage.setItem('UserToken', data.token);
        result = {
          isOk: true,
          data: data,
          message: 'Authentication successful',
        };
        this._user = data.authenticatedUser;
        this.router.navigate([this._lastAuthenticatedPath]);
      })
      .catch((err) => {
        result = {
          isOk: false,
          data: err,
          message: 'Authentication failed',
        };
      });

    return result;
  }

  async getUser() {
    return this.loggedIn
      ? {
          isOk: true,
          data: this._user,
        }
      : {
          isOk: false,
          data: null,
        };
  }

  async logOut() {
    this._user = null;
    localStorage.removeItem('SignedUser');
    localStorage.removeItem('UserToken');
    this.router.navigate(['/login']);
  }

  getauthenticatedUser = () => this._user;
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = ['login'].includes(
      route.routeConfig?.path || defaultPath
    );

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath =
        route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
