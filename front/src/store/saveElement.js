export const host = 'http://localhost:5000';
// export const host = '';

export const accessCookieToken = () => 'Bearer ' + (document.cookie.match(/at=(.+?)(;|$)/)[1]) || 1;
export const refreshCookieToken = () => 'Bearer ' + (document.cookie.match(/rt=(.+?)(;|$)/)[1]) || 1;