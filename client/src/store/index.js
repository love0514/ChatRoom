

import {
    autorun,
    observable,
    computed,
    action
} from "mobx";

import message from './message'
const Store = {
    messages: new message,
  

}

export default { Store }
