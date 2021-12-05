import store from '../store';

const update = function (key, value) {
  store.commit({
    type: "_update",
    data: {
      key,
      value,
    }
  });
}

export default {
  update
}