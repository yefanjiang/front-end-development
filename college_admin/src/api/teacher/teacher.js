import request from '@/utils/request'

export default {

    // 1.讲师列表（条件查询分页）
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            // url: '/serviceedu/edu-teacher/pageTeacherCondition/' + current + '/' + limit,
            url: `/serviceedu/edu-teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            // 后端我们使用了RequestBody获取数据，因此是个json，这里也要用json传递
            data: teacherQuery
        })
    },

    removeTeacher(id) {
        return request({
            url: `/serviceedu/edu-teacher/${id}`,
            method: 'delete'
        })
    },

    addTeacher(teacher) {
        return request({
            url: `/serviceedu/edu-teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },

    getTeacherById(id) {
        return request({
            url: `/serviceedu/edu-teacher/getTeacherById/${id}`,
            method: 'get'
        })
    },

    updateTeacher(teacher) {
        return request({
            url: `/serviceedu/edu-teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    }
}



