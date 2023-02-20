<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 15:25:11
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-20 16:17:35
 * @Description: 课程收藏列表页
-->
<template>
  <view class="container collect">
    <view class="course_list">
      <view v-for="item in state.list" :key="item.id" class="course_list_item">
        <navigator class="course_list_item_a" :url="'/pages/course/detail/index?id=' + item.courseId">
          <view class="item_cover">
            <image :src="item.cover" />
          </view>
          <view class="item_content">
            <h3 class="content_title">{{ item.title }}</h3>
            <view class="content_price">
              <view class="price">¥{{ item.price }}</view>
              <view class="buy_num">{{ item.lessonNum }}人已学习</view>
            </view>
          </view>
        </navigator>
      </view>
      <!-- 加载更多 -->
      <view class="load_more">
        <uni-load-more :status="state.status" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import courseService from '@/api/course'
import { onShow, onReachBottom } from '@dcloudio/uni-app'

let state = reactive({
  list: [] as any,
  params: {
    page: 1,
    limit: 10,
  },
  status: 'more',
})

onShow(() => {
  getCollectList()
})

onReachBottom(() => {
  if (state.status !== 'noMore') {
    state.status = 'loading'
    state.params.page++
    getCollectList()
  }
})

async function getCollectList() {
  try {
    const res: any = await courseService.courseCollectList({
      ...state.params,
    })

    const items = res.data.items
    // 数组解构拼接
    state.list = [...state.list, ...items]
    if (items.length < 10) return (state.status = 'noMore')
    if (items.length >= 10) state.status = 'more'
  } catch (e) {
    console.log('e', e)
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/styles/_global.scss';

.collect {
  min-height: 100vh;
}
.course_list {
  background: #000;
  padding: 15px 15px 0;
}
.course_list_item {
  // margin: 15px 15px;
  margin-bottom: 15px;
  background: #1f2228;
  &_a {
    display: flex;
    .item_cover {
      width: 113px;
      height: 64px;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .item_content {
      flex: 1;
      padding-left: 12px;
      padding-top: 8px;

      .content_title {
        font-size: 12px;
        color: #a1a7b2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        height: 34px;
      }
      .content_price {
        display: flex;
        align-items: center;
        .price {
          color: #e53935;
          font-size: 16px;
        }
        .buy_num {
          width: 100%;
          font-size: 12px;
          color: #a1a7b2;
          margin-left: 12px;
        }
      }
    }
  }
}
</style>
