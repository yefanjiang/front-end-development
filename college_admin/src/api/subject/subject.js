import request from '@/utils/request'

export default {

    // 1.讲师列表（条件查询分页）
    getSubjectList() {
        return request({
            url: `/serviceedu/edu-subject/getAllSubject`,
            method: 'get',
        })
    }

}



