<template>
  <div class="range-silder">
    <span ref="startValue" class="text-info start-value">{{dataArray[0]}}</span>
    <span ref="endValue" class="text-info end-value">{{dataArray[dataArray.length - 1]}}</span>
    <!-- 当前值 -->
    <span class="text-info current-value" ref="currentText" :style="currentTextStyle">
      {{dataArray[currentIndex]}}
    </span>
    <!-- 进度条 -->
    <div class="silder-bar" ref="silderBar" @click="setIndex"></div>
    <div class="silder-bar percentum-bar" @click="setIndex" :style="percentumBarStyle">
      <div @mousedown="btnMousedown" class="percentum-btn"></div>
    </div>
    <!-- 刻度 -->
    <div v-if="isShowScaleLine" ref="scaleLine" class="scale-wrapper">
      <span v-for="item in scaleDate" class="scale-text" :style="{left: `${item.index/(dataArray.length-1) * 100}%`}" :key="item.index">{{item.text}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VueRangeSliderc',
  props: {
    dataArray: {
      type: Array,
      default: () => {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default: () => {
        return 0
      }
    },
    isShowScaleLine: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      currentTextStyle: {
        left: '0px',
        transform: 'translateX("0px")'
      },
      scaleZoom: 0
    }
  },
  computed: {
    percentumBarStyle() {
      if (this.dataArray.length == 0) {
        return {width: '0px'}
      } else {
        return {width: `${this.currentIndex/(this.dataArray.length-1) * 100}%`}
      }
    },
    scaleDate() {
      if (this.scaleZoom <= 0) {
        return this.dataArray.map((item, index) => {
          return {
            index: index,
            text: item
          }
        })
      } else {
        let _data = []
        // 根据缩放比例来筛选数据
        this.dataArray.forEach((item, index) => {
          // 不要第一个 最后一个
          if (index % this.scaleZoom == 0 && index != 0 && index != this.dataArray.length - 1) {
            _data.push({
              index: index,
              text: item
            })
          }
        })
        return _data
      }
    }
  },
  mounted() {
    this.setCurrentPosition()
    this.setScaleLine()
  },
  watch: {
    currentIndex() {
      this.setCurrentPosition()
    },
    dataArray: {
      handler: function() {
        this.setScaleLine()
      },
      deep: true
    }
  },
  methods: {
    // 改变当前点位置
    setCurrentPosition() {
      let _this = this
      if (this.$refs.currentText.clientWidth/2 + _this.currentIndex/(_this.dataArray.length-1) * _this.$refs.silderBar.clientWidth >= _this.$refs.silderBar.clientWidth) {
        // left + dom.width / 2
        // 在末尾 如果tooltip超过bar宽度则left 100%
        this.currentTextStyle = {
          left: '100%',
          transform: `translateX(-${this.$refs.currentText.clientWidth}px)`
        }
        return
      } else if (_this.currentIndex/(_this.dataArray.length-1) * _this.$refs.silderBar.clientWidth - this.$refs.currentText.clientWidth/2 <= 0) {
        // left - dom.width / 2
        // 在最开始 如果tooltip超过bar宽度则left 0%
        this.currentTextStyle = {
          left: '0%',
          transform: 'translateX(0px)'
        }
        return
      }
      // 当前值改变时, 重新获取currentText的宽度
      this.currentTextStyle = {
        left: `${(_this.currentIndex/(_this.dataArray.length-1) * 100) > 100 ? 100 : _this.currentIndex/(_this.dataArray.length-1) * 100}%`,
        transform: `translateX(-${this.$refs.currentText.clientWidth/2}px)`
      }
    },
    //
    btnMousedown() {
      let _this = this
      // sidler 距离视口的距离
      let SilderLeft = _this.$refs.silderBar.getBoundingClientRect().left
      // 点击点的clientX
      document.onmousemove = function(me) {
        // 取得进度条宽度
        let barWidth = me.clientX - SilderLeft
        // 取得进度条宽度百分比
        let prcentage = barWidth / _this.$refs.silderBar.clientWidth
        // 超出边界的情况
        if (prcentage < 0) {
          prcentage = 0
        } else if (prcentage > 1) {
          prcentage = 1
        }
        // 计算当前数据索引
        let _currentIndex = Math.round(prcentage * (_this.dataArray.length-1))
        _this.$emit('setDataIndex', _currentIndex)
      }
      document.onmouseup = function() {
        document.onmousemove = null
      }
    },
    // 点击设置index
    setIndex(e) {
      let _this = this
      // 取得进度条宽度
      let barWidth = e.clientX - _this.$refs.silderBar.getBoundingClientRect().left
      // 取得进度条宽度百分比
      let prcentage = barWidth / _this.$refs.silderBar.clientWidth
      // 计算当前数据索引
      let _currentIndex = Math.round(prcentage * (_this.dataArray.length-1))
      _this.$emit('setDataIndex', _currentIndex)
    },
    // 设置刻度线
    setScaleLine() {
      if (!this.isShowScaleLine) {
        return
      }
      this.$nextTick(() => {
        this.scaleZoom = 0
        // 重置参数
        let _childNodes = this.$refs.scaleLine.childNodes
        let scaleLineWidth = 0
        // 取得所有刻度span总长(不加第一个和最后一个)
        for (let i = 0; i < _childNodes.length; i++) {
          scaleLineWidth = scaleLineWidth + _childNodes[i].clientWidth
        }
        // 数组缩放比例
        this.scaleZoom = Math.ceil(scaleLineWidth/this.$refs.silderBar.clientWidth) + 1
      })
      
    }
  }
}
</script>
<style lang="stylus" scoped>
.range-silder
  position relative
  // width calc(100% - 100px)
  // left 50px
  height 60px
  .text-info
    color #999
    font-size 10px
    line-height 10px
    padding 1px 3px
    background-color #e1e4e9
    border-radius 3px
    white-space nowrap
  .start-value
    position absolute
    top 10px
  .end-value
    position absolute
    top 10px
    right 0px
  .current-value
    position absolute
    top 10px
    background-color #EF5350
    color #fff
    transition left .3s
  .silder-bar
    position absolute
    bottom 20px
    width 100%
    height 12px
    background-color #BDBDBD
    border-radius 5px
  .percentum-bar
    user-select none // 禁止浏览器选择文字动作 IE: document.body.onselectstart=function(){returnfalse;}
    background linear-gradient(90deg, #EF5350, #C62828)
    transition all .3s
    .percentum-btn
      position absolute
      height 16px
      width 16px
      left 100%
      border-radius 50%
      transform translate(-6px, -6px)
      background-color #fff
      border 3px solid #E57373
      transition all .3s
      &:hover
        cursor pointer
        border 3px solid #EF5350
        transition all .3s
  .scale-wrapper
    position absolute
    width 100%
    bottom 0px
    height 12px
    span
      position absolute
      color #999
      font-size 10px
      line-height 10px
      padding 1px 3px
      border-radius 3px
      white-space nowrap
      transform translateX(-50%)
      &:after
        content '|'
        left 50%
        position absolute
        top -9px
        opacity 0.5
        transform scaleY(0.5)
</style>
