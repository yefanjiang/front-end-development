import request from '@/utils/request'
export default {
  getListBanner() {
    return request({
      url: `/educms/crm-banneruser/getBannerList`,
      method: 'get'
    })
  }
}