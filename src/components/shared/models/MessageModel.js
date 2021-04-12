/**
 * Message model
 */
class MessageModel {
  constructor(data = {}) {
    this.chatId = null;
    this.index = null;
    this.senderName = null;
    this.timestamp = null;
    this.text = null;
    Object.assign(this, data);
  }
}
export default MessageModel;
