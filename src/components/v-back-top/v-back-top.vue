<!--
 * @Author: 朽木白
 * @Date: 2022-08-20 17:04:01
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-18 16:29:10
 * @Description: 返回顶部按钮
-->
<template>
  <view v-show="show" class="back_top" :style="{ bottom: bottom, right: right }" @click="backTop">
    <image src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/03de0936a7aafee76646b8b2d5fa5b4f.png" />
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'VBackTop',
  props: {
    bottom: {
      type: [String, Number],
      default: 20,
    },
    right: {
      type: [String, Number],
      default: 10,
    },
  },
  setup() {
    const show = ref(false)
    const scrollHeight = ref(0)
    const backTop = () => {
      if (scrollHeight.value > 0) {
        uni.pageScrollTo({
          duration: 500,
          scrollTop: 0,
          success: () => {
            show.value = false
          },
        })
      }
    }
    return {
      show,
      scrollHeight,
      backTop,
    }
  },
  mounted() {
    // 必须在page层级页面触发onPageScroll方法，才能接收到事件
    uni.$on('onPageScroll', (e) => {
      uni.getSystemInfo({
        success: (res) => {
          this.scrollHeight = e.scrollTop - res.windowHeight
          this.show = this.scrollHeight > 0 ? true : false
        },
      })
    })
  },
})
</script>

<style lang="scss" scoped>
.back_top {
  position: fixed;
  right: 10px;
  bottom: 30px;
  z-index: 10000;
  width: 52px;
  height: 52px;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
