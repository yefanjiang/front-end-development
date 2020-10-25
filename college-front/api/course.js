import request from '@/utils/request'
export default {
    getCourseList(page, limit, searchObj) {
        return request({
        url: `/serviceedu/coursefront/getFrontCourseList/${page}/${limit}`,
        method: 'post',
        data: searchObj
        })
    },
    
    // 获取分类
    getAllSubject() {
        return request({
        url: `/serviceedu/edu-subject/getAllSubject`,
        method: 'get'
        })
    }
}