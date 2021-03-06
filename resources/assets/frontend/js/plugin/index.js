import Vue from 'vue';

const plugins = {
    install: function(Vue, options) {
        //获取X轴坐标
        Vue.getX = function(evt) {
            evt = evt || window.event;
            return evt.clientX;
        };
        //获取Y轴坐标
        Vue.getY = function(evt) {
            evt = evt || window.event;
            return evt.clientY
        };
        /**
         * 时间格式解析
         * @param  {string} time    时间戳
         * @param  {string} cFormat 过滤格式
         * @return {string}
         */
        Vue.parseTime = function(time, cFormat) {
            const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
            let date = new Date(time * 1000);
            const formatObj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                i: date.getMinutes(),
                s: date.getSeconds(),
                a: date.getDay()
            };
            const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
                let value = formatObj[key];
                if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
                if (result.length > 0 && value < 10) {
                    value = '0' + value;
                }
                return value || 0;
            });
            return time_str;
        }
    }
};
Vue.use(plugins);
export default plugins;