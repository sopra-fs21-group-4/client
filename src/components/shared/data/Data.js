import {api, handleError} from "../../../helpers/api";
import User from "./User";

/**
 * Class to fetch data from localStorage
 */
class Data {

  static async get(entityId) {
    if (!entityId) return;
    let entity = JSON.parse(sessionStorage.getItem(entityId));
    if (entity) return entity;
    try {
      const url = `/entity/${entityId}`;
      const config = {headers: User.getUserAuthentication()};
      const response = await api.get(url, config);
      this.put(entityId, response.data)
      return response.data
    } catch (error) {
      //alert(`Something went wrong trying to fetch entity #${entityId}: \n${handleError(error)}`);
    }
  }

  static async getList(ids) {
    if (!ids || !ids.length) return [];
    let list = [];
    for (let id of ids) {
      list.push(await(this.get(id)))
    }
    return list;
  }

  static put(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data))
  }

  /**
   * sends a subscribe request to the backend
   * @param entityId id of the resource to subscribe
   */
  static async observeEntity(entityId) {
    if (!entityId) return;
    try {
      const url = '/observeEntity';
      const config = {headers: User.getUserAuthentication()};
      await api.put(url, entityId, config);
      console.log(`observing entity #${entityId}`);
    } catch (error) {
      alert(`Something went wrong trying to observe entity #${entityId}: \n${handleError(error)}`);
    }
  }

  /**
   * sends an unsubscribe request to the backend
   * @param entityId id of the resource to subscribe
   */
  static async disregardEntity(entityId) {
    try {
      const url = '/disregardEntity';
      const config = {headers: {
          entityId: entityId,
          ...User.getUserAuthentication()
        }};
      await api.put(url, "", config);
      console.log(`no longer observing entity #${entityId}`);
    } catch (error) {
      alert(`Something went wrong trying to disregard entity #${entityId}: \n${handleError(error)}`);
    }
  }

}
export default Data;
