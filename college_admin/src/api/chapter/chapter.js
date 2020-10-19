import request from '@/utils/request'


export default {

    getAllChapterVideo(courseId) {
        return request({
            url: '/serviceedu/edu-chapter/getChapterVideo/' + courseId,
            method: 'get'
        })
    },

    addChapter(chapter) {
        return request({
            url: '/serviceedu/edu-chapter/addChapter/',
            method: 'post',
            data: chapter
        })
    },

    getChapter(chapterId) {
        return request({
            url: '/serviceedu/edu-chapter/getChapter/' + chapterId,
            method: 'get'
        })
    },

    updateChapter(chapter) {
        return request({
            url: '/serviceedu/edu-chapter/updateChapter/',
            method: 'post',
            data: chapter
        })
    },

    deleteChapter(chapterId) {
        return request({
            url: '/serviceedu/edu-chapter/deleteChapter/' + chapterId,
            method: 'delete'
        })
    }

}