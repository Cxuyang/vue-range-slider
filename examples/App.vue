<template>
  <div id="app" class="app-wrapper">
    <vue-range-sliderc
      :dataArray="dataArray"
      :currentIndex="currentIndex"
      :isShowScaleLine="isShowScaleLine"
      @setDataIndex="setDataIndex"/>
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.app-wrapper
  padding 50px 10px
</style>
