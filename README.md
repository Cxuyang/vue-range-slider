<div align="center">
  <h1>Vue-Range-Sliderc</h1>
</div>
<a href="https://www.npmjs.com/package/vue-range-sliderc"><img src="https://img.shields.io/npm/v/vue-range-sliderc.svg" /></a> 
<a href="https://npm-stat.com/charts.html?package=vue-range-sliderc"><img src="https://img.shields.io/npm/dt/vue-range-sliderc.svg" /></a>


基于vue的范围拖动条组件

![demo](https://github.com/Cxuyang/vue-range-slider/blob/master/examples/assets/demo.gif)

## Features

- 支持拖动播放以及定点播放
- 根据数据索引来改变播放进度
- 支持刻度线动态显示(为了更好的显示,尽量保证每个数据项文本长度一致)

## Installation

```
$ npm install vue-range-sliderc
or
$ yarn add vue-range-sliderc

```

## Usage

```main.js
import VueRangeSilderc from 'vue-range-sliderc'
import 'vue-range-sliderc/lib/vue-range-sliderc.css'
Vue.use(VueRangeSilderc)
```

```vue
<template>
  <div class="app-wrapper">
    <vueRangeSilderc :dataArray="dataArray" :currentIndex="currentIndex" :isShowScaleLine="isShowScaleLine" @setDataIndex="setDataIndex"/>
  </div>
</template>
<script>

export default {
  data() {
    return {
      dataArray: [
        '2019-02-01 00',
        '2019-02-01 01',
        '2019-02-01 02',
        '2019-02-01 03',
        '2019-02-01 04',
        '2019-02-01 05',
        '2019-02-01 06',
        '2019-02-01 07',
        '2019-02-01 08',
        '2019-02-01 09',
        '2019-02-01 10',
        '2019-02-01 11',
        '2019-02-01 12',
        '2019-02-01 13',
        '2019-02-01 14',
        '2019-02-18 15',
        '2019-02-18 16',
        '2019-02-18 17',
        '2019-02-18 18',
        '2019-02-18 19',
        '2019-02-18 20',
        '2019-02-18 21',
        '2019-02-18 22',
        '2019-02-18 23',
        '2019-02-19 00'
      ],
      isShowScaleLine: true, // 是否显示刻度线
      currentIndex: 0 // 当前数据索引
    }
  },
  methods: {
    // 设置播放数据索引
    setDataIndex(index) {
      this.currentIndex = index
    },
  },
  components: {
    vueRangeSilder
  }
}
</script>

```

## Demo

源码请前往 [components](https://github.com/Cxuyang/vue-range-slider/blob/master/examples/components/vue-range-slider.vue) 目录

### Available props

| 参数            | 类型     | 默认值 |  备注                     |
| ---------       | ------  |------ | --------------------------|
| dataArray       | Array   | []    | Vue-Range-Slider数据列表   |
| isShowScaleLine | Boolean | true  |  是否显示刻度条             |
| currentIndex    | Number  |  0    | 当前数据索引                |

### Function

| 函数名      | 参数   | 备注                                                         |
| --------- | ------ | ------------------------------------------------------------ |
| setDataIndex   | index |    当前数据索引                                           |

## 期望

1. 针对于不同数据项文本长度的不同 对刻度线显示进行优化
2. 优化代码
3. 增加更多自定义控制

## License

MIT