import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // return true;
  const token = localStorage.getItem('access_token');

  if (token) {
    return true;
  } 
  else 
  {
    const redirectUri = encodeURIComponent(window.location.origin + '/callback');
    const loginUrl = `https://main-auth.extremesofts.com/auth/login/redirect?redirect_uri=${redirectUri}`;
    window.location.href = loginUrl;
    return false;
  }
};
