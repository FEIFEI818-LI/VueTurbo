import { defineStore, createPinia } from 'pinia';

interface GlobalState {
    token: string;
    userInfo: any;
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
const useGlobalStore = defineStore('GlobalState', {
    state: (): GlobalState => ({ token: '', userInfo: {} }),
    getters: {},
    actions: {
        // 不使用箭头函数
        setToken(token: string) {
            this.token = token;
        },
        setUserIngo(userInfo: any) {
            this.userInfo = userInfo;
        }
    }
});

const pinia = createPinia();

export const globalStore = useGlobalStore(pinia);

export default pinia;