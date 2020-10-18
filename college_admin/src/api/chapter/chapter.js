import request from '@/utils/request'


export default {

    getAllChapterVideo(courseId) {
        return request({
            url: '/serviceedu/edu-chapter/getChapterVideo/' + courseId,
            method: 'get'
        })
    }


}