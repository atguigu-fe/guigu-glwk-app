<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 10:42:43
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-20 16:07:53
 * @Description: 评论列表
-->
<template>
  <view class="container comment">
    <v-comment :list="state.commentList"></v-comment>
    <!-- 加载更多 -->
    <view class="load_more">
      <uni-load-more :status="state.status" />
    </view>

    <view class="comment_bar">
      <input
        v-model="state.content"
        class="input_box"
        placeholder="请点击输入"
        cursor-spacing="10"
        @confirm="handleComment"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <uni-icons class="input_icon" type="paperplane-filled" size="20" @click="handleComment" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import userService from '@/api/user'
import { useUserStore } from '@/store/user'

let state = reactive({
  options: {} as any,
  params: {
    page: 1,
    limit: 10,
  },
  commentList: [] as any,
  status: 'more',
  content: '',
})

let isInput = ref(false)

onLoad((options) => {
  state.options = options
  getCommentList()
})

onReachBottom(() => {
  if (state.status !== 'noMore') {
    state.status = 'loading'
    state.params.page++
    getCommentList()
  }
})
async function getCommentList() {
  try {
    const res: any = await userService.commentList({
      ...state.params,
      ...state.options,
    })
    const items = res.data.items
    // 数组解构拼接
    state.commentList = [...state.commentList, ...items]
    if (items.length < 10) return (state.status = 'noMore')
    if (items.length >= 10) state.status = 'more'
  } catch (e) {
    console.log('e', e)
  }
}
/**
 * @description: 发表评论-判断登陆状态
 * @return {*}
 */
async function commentAdd() {
  try {
    const res: any = await userService.commentAdd({ content: state.content, ...state.options })

    if (res.message == '成功') {
      uni.showToast({
        title: '评论发送成功',
      })
      state.content = ''
      state.params.page = 1
      state.commentList = []
      getCommentList()
    } else {
      uni.showToast({
        title: '评论发送失败',
        icon: 'error',
      })
    }
  } catch (e) {
    console.log('e', e)
  }
}
function handleComment() {
  useUserStore().goToLogin(() => {
    commentAdd()
  })
}
function handleFocus() {
  isInput.value = true
}
function handleBlur() {
  isInput.value = false
}
function handleInput() {
  isInput.value = true
}
</script>

<style lang="scss" scoped>
@import '@/static/styles/_global.scss';
.comment {
  background: white;
  padding: 16px 16px 50px 16px;
  height: 100%;
  .comment_bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      180deg,
      hsla(0, 0%, 86.7%, 0) 0,
      hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
      hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
      #fff 0.64286rem,
      #fff
    );

    .input_box {
      width: 80%;
      height: 30px;
      line-height: 30px;
      background-color: #f2f3f7;
      border-radius: 20px;
      // text-indent: 10px;
      padding-left: 10px;
      font-size: 16px;
    }
    .input_icon {
      margin-left: 8px;
    }
  }
}
</style>
