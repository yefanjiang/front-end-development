import request from '@/utils/request'

export default {

  saveVideoInfo(videoInfo) {
    return request({
      url: '/serviceedu/edu-video/addVideo/',
      method: 'post',
      data: videoInfo
    })
  },

  getVideoInfoById(id) {
    return request({
      url:'/serviceedu/edu-video/getVideo/' + id,
      method:'get'
    })
  },

  updateVideoInfoById(videoInfo) {
    return request({
      url:'/serviceedu/edu-video/updateVideo/',
      method: 'post',
      data: videoInfo
    })
  },

  removeById(id) {
    return request({
      url:'/serviceedu/edu-video/deleteVideo/' + id,
      method:'delete'
    })
  }
}