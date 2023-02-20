<!--
 * @Author: 朽木白
 * @Date: 2022-08-23 10:19:29
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-20 15:08:08
 * @Description: 
-->
<template>
  <view class="container teacher_detail">
    <view class="block">
      <h3 class="title">个人介绍</h3>
      <view class="content">
        <view class="avatar">
          <image :src="detailData.teacher.avatar" />
        </view>
        <h3 class="name">{{ detailData.teacher.name }} 高级讲师</h3>
        <view class="tag">{{ detailData.teacher.career }}</view>
        <view class="intro">{{ detailData.teacher.intro }}</view>
      </view>
    </view>

    <view class="block">
      <h3 class="title">主讲课程</h3>

      <view class="main_course">
        <v-card-list v-if="detailData.courseList.length > 0" type="course" :list="detailData.courseList"></v-card-list>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import teacherService from '@/api/teacher'
import { onLoad } from '@dcloudio/uni-app'
import VCardList from '@/components/v-card-list/v-card-list.vue'
let detailData: any = ref({})

onLoad((options) => {
  const id = options.id || ''
  getTeacherDetail(id)
})

async function getTeacherDetail(id: number | string) {
  try {
    const res: any = await teacherService.teacherDetail(id)
    detailData.value = res.data
  } catch (e) {
    console.log('e', e)
  }
}
</script>

<style scoped lang="scss">
@import '@/static/styles/_global.scss';

.teacher_detail {
  background: #fff;
  padding: 0 5px;
}
.block {
  // background: #1f2228;
  margin-bottom: 14px;
  .title {
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    color: #737780;
    border-bottom: 1px solid #a1a7b2;
  }

  .content {
    font-size: 12px;
    color: #a1a7b2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    .avatar {
      width: 252px;
      height: 297px;
      image {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      font-size: 16px;
      color: #737780;
      padding: 20px;
    }

    .tag {
      background: #f2f2f2;
      color: #888;
      padding: 10px 15px;
      line-height: 18px;
    }

    .intro {
      line-height: 24px;
      margin-top: 15px;
      text-indent: 16px;
      padding: 5px;
    }
  }
  .main_course {
    padding: 10px;
  }
}
</style>
