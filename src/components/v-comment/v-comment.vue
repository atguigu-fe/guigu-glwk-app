<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 10:45:21
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-20 15:44:36
 * @Description: 
-->
<template>
  <view class="comment_list">
    <view v-for="item in list" :key="item.id" class="comment_item">
      <view class="logo">
        <image :src="item.avatar" />
      </view>
      <view class="content_wrap">
        <view class="name">{{ item.nickname }}</view>
        <veiw class="date"
          >{{ item.gmtCreate }}
          <uni-rate :touchable="false" :value="5" size="12" />
        </veiw>
        <view class="content">{{ item.content }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VComment',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.comment_list {
  .comment_item {
    display: flex;
    padding: 15px 0;
    border-bottom: 0.07143rem solid #ececec;

    .logo {
      border-radius: 50%;
      width: 32px;
      height: 32px;
      margin-right: 8px;
      image {
        border-radius: 50%;
        height: 100%;
        width: 100%;
      }
    }
    .content_wrap {
      font-size: 12px;
      color: #000;
      flex: 1;
      .date {
        color: #a1a5b2;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .content {
        margin-top: 8px;
      }
    }
  }
}
</style>
