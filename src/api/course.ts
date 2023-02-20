/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-20 16:14:26
 * @Description:
 */
import Service from '@/utils/request'
import { PageParams } from './type'

class Course extends Service {
  /**
   * @description: 获取首页热门课程和名师大咖
   * @param {*} options
   * @return {*}
   */
  indexCourse() {
    const url = '/api/edu/index'
    return this.get({ url })
  }
  /**
   * @description: 获取首页banner图
   * @param {*} options
   * @return {*}
   */
  banner() {
    const url = '/api/cms/banner'
    return this.get({ url })
  }
  /**
   * @description: 获取课程列表
   * @param {*} options
   * @return {*}
   */
  courseList(options: PageParams) {
    const url = `/api/edu/course/${options.page}/${options.limit}`
    return this.get({ url })
  }
  /**
   * @description: 获取课程详情
   * @param {*} options
   * @return {*}
   */
  courseDetail(options: { id: string | number }) {
    const url = `/api/edu/course/${options.id}`
    return this.get({ url })
  }
  /**
   * @description: 收藏课程
   * @param {*} options
   * @return {*}
   */
  courseCollectSave(options: { courseId: number | string }) {
    const url = `/api/edu/courseCollect/auth/save/${options.courseId}`
    return this.post({ url })
  }
  /**
   * @description: 取消收藏课程
   * @param {*} options
   * @return {*}
   */
  courseCollectRemove(options: { courseId: number | string }) {
    const url = `/api/edu/courseCollect/auth/remove/${options.courseId}`
    return this.delete({ url })
  }
  /**
   * @description: 收藏课程列表
   * @param {*} options
   * @return {*}
   */
  courseCollectList(options: { page: number; limit: number }) {
    const url = `/api/edu/courseCollect/auth/${options.page}/${options.limit}`
    return this.get({ url })
  }
  /**
   * @description: 获取视频地址
   * @param {*} options
   * @return {*}
   */
  getVideoSource(options: { videoSourceId: number | string }) {
    const url = `/api/vod/video/getPlayURL/${options.videoSourceId}`
    return this.get({ url })
  }
}

const courseService = new Course()
export default courseService
