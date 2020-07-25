const store = localStorage
export default {
  set(key,value) {
    if (typeof value === 'object') {
      store.setItem(key,JSON.stringify(value))
    } else {
      store.setItem(key,value)
    }
  },
  get(key) {
    return JSON.parse(store.getItem(key))||{}
  },
  remove(key) {
    localStorage.removeItem(key)
  }
}
