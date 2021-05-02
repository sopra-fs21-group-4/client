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
   * fetches either a single user from the backend
   * @param value username/userId
   * @param key 'username' or 'userId'
   * @returns {Promise<User|*>} User instance(s) from backend
   */
  static async fetchSingle(key, value) {
    if (!value) return value;
    try {
      const response = await api.get(`/user`, { headers:{ [key]: value } });
      console.log(response);
      return new User(response.data);
    } catch (error) {
      alert(`Something went wrong while fetching user ${value}: \n${handleError(error)}`);
    }

  }

  /**
   * fetches a list of users from the backend
   * @param value list of usernames/userIds
   * @param key 'username' or 'userId'
   * @returns {Promise<User|*>} User instance(s) from backend
   */
  static async fetchList(key, value) {
    if (!value) return value;
    return value.map(entry => User.fetch(entry))
  }

}
export default User;
