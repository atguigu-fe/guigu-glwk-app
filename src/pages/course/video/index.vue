<!--
 * @Author: 朽木白
 * @Date: 2022-08-27 13:56:46
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-20 17:15:48
 * @Description: 
-->
<template>
  <view class="container">
    <view>
      <video
        class="video"
        :src="state.video.playURL"
        :poster="state.course.cover"
        object-fit="fill"
        controls
        autoplay
        page-gesture
        enable-play-gesture
      ></video>
    </view>
    <view class="catalogue">
      <view class="title"> 课程目录 </view>
      <view class="catalogue_list">
        <uni-collapse ref="collapse">
          <uni-collapse-item v-for="item in state.chapterList" :key="item.id" :title="item.title">
            <view class="task_list">
              <view
                v-for="child in item.children"
                :key="child.id"
                class="task_items"
                @click="getVideoUrl(child.videoSourceId)"
              >
                <image
                  class="task_type"
                  src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/f1c59a1527e075f6ebfba3d7ac605f07.png"
                />
                <view class="task_title">{{ child.title }}</view>
              </view>
            </view>
          </uni-collapse-item>
        </uni-collapse>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import courseService from '@/api/course'
import { onLoad } from '@dcloudio/uni-app'

let state = reactive({
  options: {} as any,
  /** 章节列表 */
  chapterList: [] as any,
  /** 课程信息 */
  course: {} as any,
  /** 视频信息 */
  video: {
    playURL: '',
  },
})

onLoad((option) => {
  state.options = option
  getCourseDetail()
  getVideoUrl(state.options.videoSourceId)
})
async function getCourseDetail() {
  try {
    const res: any = await courseService.courseDetail({
      id: state.options.id,
    })
    state.chapterList = res.data.chapterList
    state.course = res.data.course
  } catch (e) {
    console.log('e', e)
  }
}
async function getVideoUrl(videoSourceId: string) {
  try {
    const res: any = await courseService.getVideoSource({
      videoSourceId,
    })

    if (res.code == 200) {
      this.video = res.data
    } else {
      uni.showToast({
        title: res.message,
        icon: 'error',
      })
    }
  } catch (e) {
    console.log('e', e)
  }
}
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
}
.catalogue {
  padding: 0 16px;
  background: #fff;
  margin-bottom: 12px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #3c464f;
    padding: 16px 0;
    .title_left {
      &::before {
        content: '';
        width: 4px;
        height: 12px;
        border-radius: 10px;
        margin-right: 6px;
        background-color: #2979ff;
      }
    }
    .title_right {
      color: #666c80;
      font-size: 12px;
    }
  }

  .catalogue_list {
    .task_list {
      .task_items {
        display: flex;
        padding: 12px;
        .task_type {
          width: 16px;
          height: 16px;
        }

        .task_title {
          flex: 1;
          font-size: 12px;
          color: #3e414d;
          margin-left: 10px;
          &::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 0;
            width: 100%;
            height: 0.07143rem;
            background-color: #c9d0d6;
            transform: scaleY(0.5);
            opacity: 0.5;
          }
        }

        .task_icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
