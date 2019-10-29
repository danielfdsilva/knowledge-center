// ======================================================================== //
//  Cookie library                                                          //
// ======================================================================== //

/**
 * Creates a cookie.
 * @param string name
 * @param string value
 * @param int days
 */
export function createCookie (name, value, days, path = '') {
  let cookieStr = [`${name}=${value}`]

  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    cookieStr.push([`expires=${date.toGMTString()}`])
  }
  cookieStr.push([`path=${path}`])

  document.cookie = cookieStr.join('; ')
}

/**
 * Reads a cookie value with the given name.
 * @param string name
 * @return mixed
 *   Cookie value or null.
 */
export function readCookie (name) {
  let nameEQ = name + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

/**
 * Deletes a cookie with the given name.
 * @param string name
 */
export function eraseCookie (name, path = '/') {
  createCookie(name, '', -1, path)
}
