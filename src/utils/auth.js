export function storeToken(token) {
  if (token) {
    localStorage.setItem('token', token )
  }
}

export function deleteToken() {
  localStorage.removeItem('token')
}

export function getToken() {
  return localStorage.getItem('token');
}

export function isUserLoggedIn() {
  return !!localStorage.getItem('token');
}

export function isUser(type, user) {
  if (!user) return false;
  const { role } = user.data.attributes;
  return role === type;
}

export function headers () {
  return {
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': localStorage.getItem('token'),
    },
  };
}
