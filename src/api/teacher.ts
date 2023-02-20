/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-20 14:30:25
 * @Description:
 */
import Service from '@/utils/request'
import type { PageParams } from './type'
class Teacher extends Service {
  /**
   * @description: 讲师详情页
   * @param {*} options
   * @return {*}
   */
  teacherDetail(id: number | string) {
    const url = `/api/edu/teacher/${id}`
    return this.get({ url })
  }
  /**
   * @description: 讲师列表页
   * @param {*} options
   * @return {*}
   */
  teacherList(options: PageParams) {
    const url = `/api/edu/teacher/${options.page}/${options.limit}`
    return this.get({ url })
  }
}

const teacherService = new Teacher()
export default teacherService
