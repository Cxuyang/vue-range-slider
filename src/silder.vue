<template>
  <div class="silder">
    <div class="nom-silder" v-if="!showMini">
      <div class="fade-silder">
        <img src="../../assets/img/home.png" />
        <i class="el-icon-menu" @click="showMiniSilder"></i>
      </div>
      <div v-for="(item, index) in menu" class="silder-block" :key="index">
        <div class="block-title" @click="toggleOpen(item)">          
          <span><i :class="item.icon"></i> {{item.name}}</span>        
          <span v-if="item.isOpen"><i class="el-icon-caret-top"></i></span>
          <span v-else><i class="el-icon-caret-bottom"></i></span>
        </div>
        <transition name="silderChildren"
          v-on:beforeEnter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave">
          <div class="block-children" v-if="item.isOpen && item.children.length>0">
            <div class="router" v-for="(childrenItem, childrenIndex) in item.children" @click="menuclick(childrenItem)" :key="childrenIndex">
              <router-link :to="childrenItem.path">{{childrenItem.name}}</router-link>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="mini-silder" v-if="showMini">
      <div class="hiddlen-silder"><i class="el-icon-menu" @click="hiddlenSilder"></i></div>
      <div class="mini-silder-block" >
        <el-popover v-for="(item, index) in menu" placement="right-start" title="" width="100" :visible-arrow="false" trigger="hover" :key="index" >
          <div class="mini-menu">
            <div class="mini-title">{{item.name}}</div>
            <div class="mini-menu-content" v-for="(childItem, childIndex) in item.children" @click="menuclick(childItem)" :key="childIndex">
              <router-link :to="childItem.path">{{childItem.name}}</router-link>
            </div>
          </div>
          <i :class="item.icon" slot="reference"></i>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
import {urlParse} from '../../common/js/common.js'
export default {
  data: function() {
    return {
      menu:[{
        name: '数据分析管理',
        icon: 'el-icon-share',
        isOpen: true,
        children: [
          {
            name: "频段统计分析",
            index: '1-1',
            path: '/spectrumAnalysis'
          },{
            name: "信道统计分析",
            index: '1-2',
            path: '/channelAnalysis'
          },{
            name: "频率使用状况分析",
            index: '1-3',
            path: '/frequencyAnalysis'
          },
          {
            name: "平台监测任务数据分析",
            index: '1-5',
            path: '/realTimeAnalysis'
          },
          {
            name: '区域频段覆盖率报表',
            index: '1-6',
            path: '/businessFreqReport'
          },
          {
            name: '多功能报表',
            index: '1-7',
            path: '/multifunctionReport'
          },
          {
            name: '电磁环境统计播放',
            path: '/playBackData',
            index: '1-8'
          },
        ]
        },{
          name: '数据分析设置',
          icon: 'el-icon-setting',
          isOpen: false,
          children: [            
            {
              name: "常用设置",
              index: '2-1',
              path: '/functionConfig'
            }
            ]
      }, 
      {
          name: '月报信息化',
          icon: 'el-icon-document',
          isOpen: false,
          children: [            
            {
              name: "频谱监测统计报表",
              index: '3-1',
              path: '/report'
            },
            // {
            //   name: "干扰排查记录表",
            //   index: '3-2',
            //   path: '/interference_check'
            // },
            // {
            //   name: "信号排查记录表",
            //   index: '3-3',
            //   path: '/unsignal_check'
            // },
            // {
            //   name: "业务频段占用度报表",
            //   index: '3-4',
            //   path: '/businessFreq_report'
            // }
          ]
      }, 
      // {
      //   name: '监测数据管理',
      //   icon: 'el-icon-edit-outline',
      //   isOpen: false,
      //   children: [            
      //     {
      //       name: "数据存储管理",
      //       index: '4-1',
      //       path: '/storageManage'
      //     },{
      //       name: "平台数据管理",
      //       index: '4-2',
      //       path: '/searchIndex'
      //     }
      //     ]
      // },
      // {
      //   name: '数据库管理',
      //   icon: 'el-icon-document',
      //   isOpen: false,
      //   children: [
      //     {
      //       name: "数据查询",
      //       index: '5-1',
      //       path: '/searchData'
      //     },
      //     {
      //       name: "备份与恢复",
      //       index: '5-2',
      //       path: '/backupAndRestore'
      //     },
      //     {
      //       name: "监测文件导入",
      //       index: '5-3',
      //       path: '/importMFile'
      //     }]
      // },
      // {
      //   name: '数据转发监测',
      //   icon: 'el-icon-refresh',
      //   isOpen: false,
      //   children: [            
      //     {
      //       name: "数据转发路由",
      //       index: '6-1',
      //       path: '/dispatchRouter'
      //     },{
      //       name: "数据转发数据监测",
      //       index: '6-2',
      //       path: '/dispatchData'
      //     }
      //     ]
      //   },
      ],
      showMini: false
    }
  },
  computed: {
    //user权限
    userName: function() {
      return urlParse()
    }
  },
  created() {
    let tempMenu = {
      name: "创建数据库",
      index: '3-4',
      isShow: false,
      path: '/createDataBase'
    }
    if (this.userName === 'admin') {
      this.menu[2].children.push(tempMenu)
    }
  },
  methods: {
    menuclick(childrenItem) {
      this.$emit('itemclick', childrenItem)
    },
    //
    toggleOpen(item) {
      item.isOpen = !item.isOpen
    },
    // 动画
    beforeEnter(el) {
      el.style.height = '0px'
    },
    enter(el) {
      if (timer) {
        return
      }
      let tempHeight = 50 * el.children.length 
      let speed = 20
      let timer = setInterval(()=>{
        el.style.height = `${speed}px`
        if(speed >= tempHeight) {
          clearInterval(timer)
        }
        speed = speed + 20
      },10)
    },
    leave(el) {
      if (timer) {
        return
      }
      let speed = 50 * el.children.length
      let timer = setInterval(()=>{
        speed = speed - 20
        el.style.height = `${speed}px`
        if(speed <= 0) {
          clearInterval(timer)
        }
      },10)
    },
    // showMiniSilder
    showMiniSilder() {
      this.showMini = true
      this.$emit('fadeSilder', true)
    },
    // hiddlenSilder
    hiddlenSilder() {
      this.showMini = false
      this.$emit('fadeSilder', false)
    },
  }
}
</script>
<style lang="stylus" scoped>
.silder
  width 100%
  display flex
  flex-direction column
  .nom-silder
    position relative
    width 100%
    display flex
    flex-direction column
    .fade-silder
      display flex
      justify-content space-between
      height 40px
      width 100%
      padding 0 10px
      background-color #20222a
      box-sizing border-box
      img
        height 24px
        width 24px
        margin 8px 10px
        &:hover
          color #009688
      i
        font-size 24px
        line-height 40px
        color #dbdbdb
        &:hover
          cursor pointer
          color #009688
    .silder-block
      box-sizing border-box
      width 100%
      color rgba(255,255,255,.7)
      font-size 14px
      font-weight 400
      display inline-block
      &:hover
        color #fff
        cursor pointer  
    .block-title
      height 50px
      padding 0 10px
      display flex
      justify-content space-between
      span
        line-height 50px
      &>span
        margin-left 10px
      &:hover
        color #009688
        transition .5s
    .block-children
      background-color #20222A
      display flex
      flex-direction column
      overflow hidden
      .router
        flex 0 0 50px
        height 50px
        display flex
        justify-content space-between
        a
          width 100%
          line-height 50px
          padding-left 40px
          color rgba(255,255,255,.7)
          &:hover
            color #fff
        .router-link-active
          background-color #009688
          color #fff
          transition .5s

  .mini-silder
    width 100%
    padding 0px
    display flex
    flex-direction column
    .hiddlen-silder
      display flex
      justify-content center
      background-color #20222a
      i
        font-size 24px
        line-height 40px
        color #dbdbdb
        &:hover
          cursor pointer
          color #009688
    .mini-silder-block
      display flex
      flex-direction column
      justify-content center
      box-sizing border-box
      width 100%
      color rgba(255,255,255,.7)
      font-size 24px
      font-weight 400
      span
        display flex
        justify-content center
        i
          line-height 40px
        &:hover
          background-color #009688
          cursor pointer
.mini-menu
  box-sizing border-box
  div
    text-align center    
    font-size 14px
    font-weight 400
    line-height 30px
    a
      color #606266
  .mini-title
    background-color #1d2b36
    color #fff
  .mini-menu-content
    &:hover
      background-color #009688
      a
        color #fff
/* 侧边栏动画 */
.silderChildren-enter-active, .silderChildren-leave-active
  transition: all .5s
// .silderChildren-enter, .silderChildren-leave-to
//   opacity: 0
</style>