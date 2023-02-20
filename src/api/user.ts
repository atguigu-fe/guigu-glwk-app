import Service from '@/utils/request'
import type { CommentAddParams, CommnetParams } from './type'
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
  /**
   * @description: 添加评论
   * @param {*} options
   * @return {*}
   */
  commentAdd(options: CommentAddParams) {
    const url = '/api/edu/comment/auth/save'
    return this.post({ url, data: options })
  }
  /**
   * @description: 评论列表
   * @param {*} options
   * @return {*}
   */
  commentList(options: CommnetParams) {
    const url = `/api/edu/comment/${options.page}/${options.limit}`
    return this.get({ url, data: { ...options } })
  }
}

const userService = new User()
export default userService
