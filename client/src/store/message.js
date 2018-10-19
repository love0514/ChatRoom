import {
    observable,
    computed
} from "mobx"



export default class Messages {
    @observable name = ''
    @observable content = ''
    @observable time = ''

}
