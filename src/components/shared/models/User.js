/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.userId = null;
    this.username = null;
    this.password = null;
    this.token = null;
    this.status = null;
    Object.assign(this, data);
  }

  putToSessionStorage () {
    sessionStorage.setItem('token', this.token);
    sessionStorage.setItem('userId', this.userId);
    sessionStorage.setItem('username', this.username);
  }

  static putToSessionStorage(user) {
    user.putToSessionStorage();
  }

  static removeFromSessionStorage () {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
  }

  static isPresentInSessionStorage() {
    return sessionStorage.getItem('token') != null;
  }

  static getUserAuthentication() {
    return {
      userId: sessionStorage.getItem('userId'),
      token: sessionStorage.getItem('token'),
    };
  }

  static getAttribute(attribute) {
    return sessionStorage.getItem(attribute);
  }

}
export default User;
