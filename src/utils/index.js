import store from '../store';
import router from '@/router';

const update = function(key, value) {
    store.commit({
        type: "_update",
        data: {
            key,
            value,
        }
    });
}

const openTag = function(name, opt) {
    const r = router.resolve({
        name: name,
        params: opt
    })
    window.open(r.href, '_blank')
}

<<<<<<< HEAD
const transElIconName = (iconName) => {
    return 'i' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
}
export default {
    update,
    openTag,
    transElIconName
=======
const showSuccessAlert = function(text) {
  update('alertInfo', {
    text,
    type: 'success'
  })
}

const showErrorAlert = function(text) {
  update('alertInfo', {
    text,
    type: 'error'
  })
}

const debounce = function(fn, time = 200) {
  var timer = null

  return function() {
    if(timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

export default {
  update,
  openTag,
  debounce,
  showSuccessAlert,
  showErrorAlert
>>>>>>> ed834bbc4df163890e6462791058ac0189f4586a
}