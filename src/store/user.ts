import { defineStore } from 'pinia'
import { TOKEN_KEY, USER_KEY } from '@/config/cache'
import { UserInfo } from '@/types/index'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: JSON.parse(uni.getStorageSync(USER_KEY) || '{}'),
      token: uni.getStorageSync(TOKEN_KEY) || '',
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
      uni.setStorageSync(TOKEN_KEY, token)
    },
    setUser(user: UserInfo) {
      this.user = user
      uni.setStorageSync(USER_KEY, JSON.stringify(user))
    },
    goToLogin() {},
  },
})
