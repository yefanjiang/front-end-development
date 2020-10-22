import request from '@/utils/request'
export default {
  getListIndex() {
    return request({
      url: `/serviceedu/indexfront/index`,
      method: 'get'
    })
  }
}