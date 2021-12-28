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

const transElIconName = (iconName) => {
    return 'i' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
}
export default {
    update,
    openTag,
    transElIconName
}