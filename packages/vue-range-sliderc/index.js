/*
 * @Author: Cxuyang 
 * @Email: cxuyang0317@qq.com
 * @Date: 2019-04-03 16:32:00
 */
// 为组件提供 install 方法，供组件对外按需引入
import VueRangeSliderc from './src/vue-range-sliderc'
VueRangeSliderc.install = Vue => {
  Vue.component(VueRangeSliderc.name, VueRangeSliderc)
}
export default VueRangeSliderc