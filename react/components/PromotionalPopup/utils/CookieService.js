const setCookie = (cookieKey , cookieValue, expirationDays) => {
  let expiryDate = '';

  if (expirationDays) {
    expiryDate = `; max-age= ${60 * 60 * 24 * expirationDays}`;
  }

  document.cookie = `${cookieKey}=${cookieValue || ''}${expiryDate}; path=/`;
  console.log(expiryDate);
}

const getCookie = (cookieKey) => {
  let cookieName = `${cookieKey}=`;
  let cookieArray = document.cookie.split(';');
  for (let cookie of cookieArray) {
    while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1, cookie.length);
      }
    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return undefined;
}

export default { setCookie, getCookie }
