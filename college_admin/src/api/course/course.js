import request from '@/utils/request'

const api_name = '/admin/edu/course'

export default {
    // 1.添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: `/serviceedu/edu-course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },

    // 2.查询所有讲师
    getListTeacher() {
        return request({
            url: `/serviceedu/edu-teacher/findAll`,
            method: 'get'
        }) 
    },

    // 3.根据课程ID查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: `/serviceedu/edu-course/getCourseInfo/` + id,
            method: 'get'
        })
    },

    // 4.修改课程信息
    updateCourseInfoId(courseInfo) {
        return request({
            url: `/serviceedu/edu-course/updateCourseInfo` ,
            method: 'post',
            data: courseInfo
        })
    },
    
}