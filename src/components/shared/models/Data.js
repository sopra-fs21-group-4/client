import {api, handleError} from "../../../helpers/api";
import User from "./User";

/**
 * Class to fetch data from localStorage
 */
class Data {

  static get(entityId) {
    return JSON.parse(localStorage.getItem('data'))['observedEntities'][entityId];
  }

  /**
   * sends a subscribe request to the backend
   * @param resourceId id of the resource to subscribe
   */
  static async observeEntity(entityType, entityId) {
    try {
      const url = '/observeEntity';
      const config = {headers: {
          entityId: entityId,
          entityType: entityType,
          ...User.getUserAuthentication()
        }};
      await api.put(url, "", config);
      console.log(`observing ${entityType}#${entityId}`);
    } catch (error) {
      alert(`Something went wrong trying to observe ${entityType}#${entityId}: \n${handleError(error)}`);
    }
  }

  /**
   * sends an unsubscribe request to the backend
   * @param resourceId id of the resource to subscribe
   */
  static async disregardEntity(entityId) {
    try {
      const url = '/disregardEntity';
      const config = {headers: {
          entityId: entityId,
          ...User.getUserAuthentication()
        }};
      await api.put(url, "", config);
      console.log(`no longer observing entity#${entityId}`);
    } catch (error) {
      alert(`Something went wrong trying to disregard entity#${entityId}: \n${handleError(error)}`);
    }
  }

}
export default Data;
