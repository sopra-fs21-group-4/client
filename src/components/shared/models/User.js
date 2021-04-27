import {api, handleError} from "../../../helpers/api";

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
    this.email = null;
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

  /**
   * fetches either a single user or an array of users from the backend
   * @param value single username/userId or array of usernames/userIds
   * @param key 'username' or 'userId'
   * @returns {Promise<User|*>} User instance(s) from backend
   */
  static async fetch(key, value) {
    if (!value) return value;
    // arrays will be mapped
    if (value.length) {
      return value.map(entry => User.fetch(entry))
    }
    // single users will be fetched
    try {
      const response = await api.get(`/user`, { headers:{ [key]: value } });
      console.log(response);
      return new User(response.data);
    } catch (error) {
      alert(`Something went wrong while fetching user ${value}: \n${handleError(error)}`);
    }

  }

}
export default User;
