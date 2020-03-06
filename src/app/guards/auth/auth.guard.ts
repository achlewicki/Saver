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
    const redirect = () => this.router.navigateByUrl('/login');
    if (config.skipAuth) {
      localStorage.setItem('token', config.adminAccount.token);
      localStorage.setItem('user.id', config.adminAccount.user.id);
      return true;
    }

    if (!localStorage.getItem('token')) {
      redirect();
      return false;
    }

    try {
      const verificationResult = await this.authService.verifyToken(localStorage.getItem('token'));
      if (!verificationResult) { redirect(); }
      return verificationResult;
    } catch (error) {
      console.error(error);
      redirect();
      return false;
    }
  }
}
