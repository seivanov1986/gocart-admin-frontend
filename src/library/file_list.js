export default class FileListManager {
    static deleted = new Map([])

    static set(list, func) {
        this.list = list
        this.func = func
    }
  
    static getFunc() {
        return this.func
    }

    static getList() {
        return this.list
    }

    static hasDeleted(uid) {
        return this.deleted.get(uid) == true
    }

    static delete(uid) {
        this.deleted.set(uid, true)
    }
}