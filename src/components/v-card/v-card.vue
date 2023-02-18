<template>
  <view class="preferences">
    <h2 class="preferences_title">
      {{ title }}
      <navigator class="link" :url="link" :open-type="type === 'course' ? 'switchTab' : 'navigate'">
        {{ linkTitle }}
        <uni-icons type="right" size="12"></uni-icons>
      </navigator>
    </h2>
    <slot></slot>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VCard',
  props: {
    title: {
      type: String,
      default: '热门',
    },
    linkTitle: {
      type: String,
      default: '全部',
    },
    type: {
      type: String,
      default: 'course',
    },
    link: {
      type: String,
      default: '',
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.preferences {
  padding: 0 16px 24px 16px;
  &_title {
    color: #fff;
    font-size: 14px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    .link {
      font-size: 12px;
      color: #333;
    }
  }
}
</style>
