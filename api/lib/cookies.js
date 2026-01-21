import cookie from "cookie";

export function parseCookies(cookieHeader = "") {
  return cookie.parse(cookieHeader);
}
