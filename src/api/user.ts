import Service from '@/utils/request'
class User extends Service {
  /**
   * 小程序登陆接口
   */
  login(code: string) {
    const url = `/api/ucenter/webChat/callback?code=${code}`
    return this.get({ url })
  }
  /**
   * 获取用户信息
   */
  getLoginInfo() {
    const url = `/api/ucenter/member/auth/getLoginInfo`
    return this.get({ url })
  }
  /**
   * @description: 更新用户信息
   * @param {*} options
   * @return {*}
   */
  updateMember(options = {}) {
    const url = `/api/ucenter/member/auth/updateMember`
    return this.post({ url, ...options })
  }
}

const userService = new User()
export default userService
