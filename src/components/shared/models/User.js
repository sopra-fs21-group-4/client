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

  putToLocalStorage () {
    localStorage.setItem('token', this.token);
    localStorage.setItem('userId', this.userId);
    localStorage.setItem('username', this.username);
  }
}
export default User;
