import { config } from '#config/config';
import { AuthorisationService } from '#services/auth-service/authorisation.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private readonly authService: AuthorisationService,
    private readonly router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.checkUser(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(next, state);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    return this.checkUser(route.path);
  }

  private async checkUser(redirectUrl: string): Promise<boolean> {
    // skip authorisation
    if (config.skipAuth) { return new Promise<boolean>((res) => res(true)); }

    let checkResult: boolean;
    await this.authService.verifyToken(localStorage.getItem('token')).toPromise().then(
      (result) => checkResult = result,
      (error) => console.error(error)
    );
    if (!checkResult) {
      this.router.navigateByUrl('/login', { queryParams: { url: redirectUrl } });
    }
    return checkResult;
  }
}
