<template>
  <view class="container home">
    <!-- 轮播图 -->
    <view class="swiper_box">
      <swiper
        class="swiper"
        circular
        indicator-dots
        autoplay
        :interval="2000"
        indicator-color="#fff"
        indicator-active-color="#26B7FF"
        :duration="500"
      >
        <swiper-item v-for="item in bannerList" :key="item.src">
          <view class="swiper_item uni_bg_red">
            <image mode="heightFix" :src="item.src" />
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- card导航 -->
    <view>
      <view class="hot_cate">
        <view v-for="item in hostList" :key="item.src" class="hot_cate_item">
          <navigator class="hot_cate_item_a">
            <image class="hot_cate_item_img" alt="img" :src="item.src" />
            <text class="hot_cate_item_name">{{ item.name }}</text>
          </navigator>
        </view>
      </view>
    </view>
    <!-- 热门 -->
    <view class="preferences_wrapper">
      <v-card title="热门课程" link-title="全部课程" type="course" link="/pages/course/index">
        <v-card-list type="course" :list="courseList"></v-card-list>
      </v-card>
      <v-card title="名师大咖" link-title="全部名师" type="teacher" link="/pages/teacher/index">
        <v-card-list type="teacher" :list="teacherList"></v-card-list>
      </v-card>
    </view>

    <v-back-top></v-back-top>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onPageScroll } from '@dcloudio/uni-app'
import courseService from '@/api/course'
import VCard from '@/components/v-card/v-card.vue'
import VCardList from '@/components/v-card-list/v-card-list.vue'
import VBackTop from '@/components/v-back-top/v-back-top.vue'
import { hotCateList, bannerCateList } from '@/common/constant'

const hostList = ref(hotCateList)
const bannerList = ref(bannerCateList)
const courseList = ref([])
const teacherList = ref([])

onLoad(() => {
  getCourseList()
})
// 监听滚动事件，控制返回顶部按钮
onPageScroll((res) => {
  uni.$emit('onPageScroll', res)
})

// 获取热门课程和名师列表
async function getCourseList() {
  try {
    const res: any = await courseService.indexCourse()
    teacherList.value = res.data.teacherList
    courseList.value = res.data.courseList
  } catch (e) {
    console.log('e', e)
  }
}
function focus() {
  // 点击首页搜索框，跳转到课程页面
  uni.switchTab({
    url: '/pages/course/index?focus=true',
  })
}
</script>

<style scoped lang="scss">
@import '@/static/styles/_global.scss';
@import '@/static/styles/_uni-defult.scss';

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background: #1f2228;
}
.swiper_box {
  width: 100%;

  .swiper_item {
    width: 100%;
    height: 100%;
    background: #000;
  }
}

.hot_cate {
  padding: 10px;
  background: linear-gradient(180deg, #17181a, #17181a 60%, #050505);
  display: flex;
  flex-wrap: wrap;
  &_item {
    width: 20%;
    &_a {
      display: flex;
      // @include flex-display;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    &_img {
      width: 36px;
      height: 36px;
      margin-bottom: 8px;
    }
    &_name {
      font-size: 12px;
      color: #737780;
    }
  }
}

.preferences_wrapper {
  background: $uni-bg-color;
}
</style>
