import store from '../store';
import router from '@/router';

const update = function (key, value) {
  store.commit({
    type: "_update",
    data: {
      key,
      value,
    }
  });
}

const openTag = function(url, opt) {
  const r = router.resolve({
    path: url,
    query: opt
  })
  console.log(r);
  window.open(r.href, '_blank')
}

export default {
  update,
  openTag
}