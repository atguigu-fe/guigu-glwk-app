/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-20 16:59:39
 * @Description:
 */
import Service from '@/utils/request'
import { PageParams } from './type'

class Order extends Service {
  /**
   * @description: 获取订单列表
   * @param {*} options
   * @return {*}
   */
  orderList(options: PageParams) {
    const url = `/api/order/auth/${options.page}/${options.limit}`
    return this.get({ url })
  }
  /**
   * @description: 创建订单
   * @param {*} options
   * @return {*}
   */
  addOrder(courseId: string) {
    const url = `/api/order/auth/save/${courseId}`
    return this.post({ url })
  }
  /**
   * @description: 获取订单详细信息
   * @param {*} options
   * @return {*}
   */
  getOrderInfo(orderId: string) {
    const url = `/api/order/auth/get/${orderId}`
    return this.get({ url })
  }
  /**
   * @description: 支付订单
   * @param {*} options
   * @return {*}
   */
  orderPay(orderNo: string) {
    const url = `/api/order/webChat/createJsapi/${orderNo}`
    return this.get({ url })
  }
  /**
   * @description: 查询订单支付状态
   * @param {*} options
   * @return {*}
   */
  payStatus(orderNo: string) {
    const url = `/api/order/webChat/queryPayStatus/${orderNo}`
    return this.get({ url })
  }
}

const orderService = new Order()
export default orderService
