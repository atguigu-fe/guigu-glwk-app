<template>
  <view class="container login_container">
    <view class="login_content">
      <view class="login_logo"></view>
      <view class="login_main_type">
        <button class="login_main_type_item" @click="handleLogin('weixin')">
          <text>微信登陆</text>
        </button>
      </view>
    </view>
    <view class="login_footer">
      <view class="login_protocol">
        <view :class="['login_check_icon', checked ? 'checked' : '']" @click="handleChecked"></view>
        <view class="login_block">
          我已阅读并同意
          <navigator class="link">用户协议</navigator>
          和
          <navigator class="link">隐私声明</navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userService from '@/api/user'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const checked = ref(false)
const userInfo = ref({
  nickName: '',
  avatarUrl: '',
})
const handleChecked = () => {
  checked.value = !checked.value
}

const handleLogin = (type: string) => {
  if (!checked.value) {
    return uni.showToast({
      title: '请阅读并同意用户协议&隐私声明',
      icon: 'none',
      position: 'bottom',
    })
  }

  if (type === 'weixin') {
    mpWeixinLogin()
  }
}

const mpWeixinLogin = () => {
  uni.getUserProfile({
    lang: 'zh_CN',
    desc: '用于完善会员资料',
    success: async (res) => {
      userInfo.value = {
        avatarUrl: res.userInfo.avatarUrl,
        nickName: res.userInfo.nickName,
      }
      uni.login({
        success(data) {
          const code = data.code
          login(code)
        },
      })
    },
  })
}

const login = async (code: string) => {
  try {
    const res: any = await userService.login(code)
    userStore.setToken(res.data.token)
    getUserInfo(res.data.token)
  } catch (e) {
    console.log(e)
  }
}

const getUserInfo = async (token: string) => {
  try {
    const res: any = await userService.getLoginInfo()
    if (res.data.item) {
      // 需要更新用户信息
      if (!res.data.item.nickname) {
        updateUserInfo()
      } else {
        const { avatar, nickname } = res.data.item
        userStore.setUser({ nickName: nickname, avatarUrl: avatar })
        jump()
      }
    }
  } catch (e) {
    console.log(e)
  }
}

const updateUserInfo = async () => {
  try {
    const res: any = await userService.updateMember({
      data: {
        avatar: userInfo.value.avatarUrl,
        nickname: userInfo.value.nickName,
      },
    })

    if (res.code == 200) {
      // 登陆成功，保存个人信息，返回个人页面
      userStore.setUser({ avatarUrl: userInfo.value.avatarUrl, nickName: userInfo.value.nickName })
      jump()
    }
  } catch (e) {
    console.log(e)
  }
}

const jump = () => {
  uni.showToast({
    title: '登陆成功',
    icon: 'success',
    success: () => {
      // 跳转到个人页面
      uni.navigateBack({})
    },
  })
}
</script>

<style lang="scss" scoped>
.login_container {
  background: #0099fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .login_content {
    padding: 0 36px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 48px;
    .login_logo {
      width: 72px;
      height: 72px;
    }
    .login_main_type {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 48px;

      .login_main_type_item {
        height: 56px;
        margin-bottom: 24px;
        border-radius: 30px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        text-align: center;
        image {
          width: 26px;
          height: 26px;
        }
        text {
          margin-left: 8px;
          color: #2196f3;
          font-size: 18px;
        }
      }
    }
    .login_more {
      color: #fff;
      font-size: 14px;
    }
  }
  .login_footer {
    .login_protocol {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      .login_block {
        display: flex;
        color: #4db5fb;
      }
      .login_check_icon {
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: 24px 48px;
        background-image: url('https://8.idqqimg.com/edu/mobilev2/m-core/1f3256dafe9eb438879b434bd4105394.png');
        background-position: 0 0;
        &.checked {
          background-position: 0 -24px;
        }
      }
      .link {
        color: #fff;
      }
    }
  }
}
</style>
