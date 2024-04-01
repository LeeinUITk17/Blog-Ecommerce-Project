
class Message {
    constructor(sender, content) {
        this.sender = sender;
        this.content = content;
        this.timestamp = new Date();
    }
}

module.exports = Message;
