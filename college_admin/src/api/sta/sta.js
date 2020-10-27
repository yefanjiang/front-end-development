import request from '@/utils/request'

export default {

    createStatistics(day) {
        return request({
        url: `/staservice/sta/registerCount/${day}`,
        method: 'post'
        })
    }
}