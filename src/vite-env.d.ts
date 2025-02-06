/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
}

declare module 'vue' {
    interface ComponentCustomProperties {
        /**
         * 返回assets目录下的资源绝对路径
         * @param {string} url - assets目录下的资源文件路径.
         * @returns {string} 返回绝对路径
         */
        $require: (url: string) => string,
        $format: {
            /**
             * 格式化日期
             * @param {string | Date} [date] - 日期对象
             * @param {string} fmt - 格式 yyyy-MM-dd hh:mm:ss
             * @returns {string} 返回格式化后的日期字符串
             */
            date: (date: string | Date | undefined, fmt: string) => string;
            /**
             * 转义html字符
             * @param {string} htmlString - 待转义的html字符串
             * @returns {string} 返回转义后
             */
            html: (htmlString: string) => string;
        }
    }
}

export { }