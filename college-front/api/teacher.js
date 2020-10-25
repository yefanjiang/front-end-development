import request from '@/utils/request'


export default {
  getTeacherList(page, limit) {   
    return request({
      url: `/serviceedu/teacherfront/getTeacherFrontList/${page}/${limit}`,
      method: 'post'
    })
  },

  getTeacherInfo(id) {   
    return request({
      url: `/serviceedu/teacherfront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }
}


