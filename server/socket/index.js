const Messages = require('../models/message');
const moment = require('moment');


class SocketHander {
    constructor() {
        this.db;
    }
    connect() {
        this.db = require('mongoose').connect('mongodb://192.168.1.161:27017/ChatRoom');
        this.db.Promise = global.Promise;
    }

    getMessages() {
        return Messages.find();
    }

    storeMessages(data) {

        console.log(data);
        const newMessages = new Messages({
            name: data.name,
            msg: data.msg,
            time: moment().valueOf(),
        });

        const doc = newMessages.save();
    }
}
module.exports = SocketHander;