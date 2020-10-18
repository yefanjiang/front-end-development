<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">

    <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
    </el-form-item>

    <!-- 所属分类 TODO -->
    <!-- 一级分类 -->
    <el-form-item label="课程类别">
    <el-select
        v-model="courseInfo.subjectParentId"
        placeholder="一级分类"
        @change="subjectFirstChanged">
        <el-option
        v-for="subject in subjectFirstList"
        :key="subject.id"
        :label="subject.title"
        :value="subject.id"/>
    </el-select>
    
    <!-- 二级分类 -->
    <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
    <el-option
        v-for="subject in subjectSecondList"
        :key="subject.id"
        :label="subject.title"
        :value="subject.id"/>
    </el-select>
    </el-form-item>

    <!-- 课程讲师 TODO -->
    <el-form-item label="课程讲师">
    <el-select
        v-model="courseInfo.teacherId"
        placeholder="请选择">
        <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
    </el-select>
    </el-form-item>

    <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
    </el-form-item>

    <!-- 课程简介 TODO -->
    <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
    </el-form-item>

    <!-- 课程封面 TODO -->
    <el-form-item label="课程封面">
    <el-upload
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :action="BASE_API+'/serviceedu/edu-subject/addSubject'"
        class="avatar-uploader">
        <img width="100" height="100" :src="courseInfo.cover">
    </el-upload>

    </el-form-item>


    <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
    </el-form-item>

    <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
    </el-form-item>
    </el-form>

  </div>
</template>
<script>
import course from '@/api/course/course.js'
import subject from '@/api/subject/subject.js'
import Tinymce from '@/components/Tinymce'
export default {
    components: {
        Tinymce
    },

    data() {
    return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        courseInfo: {
            title: '',
            subjectId: '',
            subjectParentId: '',
            teacherId: '',
            lessonNum: 0,
            description: '',
            cover: '/static/index.jpg',
            price: 0
        },
        courseId: '',
        teacherList: [],
        subjectFirstList: [],
        subjectSecondList: [],
        BASE_API: process.env.BASE_API, // 接口API地址

    }
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        this.getCourseInfoId()
        //this.updateCourseInfoId()
    } else {
        this.getListTeacher()
        this.getSubjectList()
    }
      
  },

  methods: {
    saveOrUpdate() {
        course.addCourseInfo(this.courseInfo)
            .then(response => {
                this.$message({
                    type: 'success',
                    message: '添加课程信息成功!'
                })
                this.$router.push({ path: '/course/chapter/' + response.data.courseId })
            })
        
    },

    getListTeacher() {
        course.getListTeacher()
            .then(response => {
                this.teacherList = response.data.items
            })
    },

    getSubjectList() {
        subject.getSubjectList()
            .then(response => {
                this.subjectFirstList = response.data.list
            })
    },
    subjectFirstChanged(value) {
        // value就是一级分类的ID，这个是封装好的
        for (let i = 0; i < this.subjectFirstList.length; i++) {
            if (this.subjectFirstList[i].id === value) {
                this.subjectSecondList = this.subjectFirstList[i].children
                // 每次切换一级分类的时候，二级分类应该清空
                this.courseInfo.subjectId = ''
            }
        }
    },

    handleAvatarSuccess() {
        console.log(res)// 上传响应
        console.log(URL.createObjectURL(file.raw))// base64编码
        this.courseInfo.cover = res.data.url
    },

    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
    },


    getCourseInfoId() {
        course.getCourseInfoId(this.courseId)
            .then(response => {
                // coureseInfo中包含了一级分类和二级分类
                this.courseInfo = response.data.courseInfoVo
                // 查询所有分类，包含一级二级
                subject.getSubjectList()
                    .then(response2 => {
                        this.subjectFirstList = response2.data.list

                        // 把所有一级分类数组进行遍历，比较当前courseInfo的一级分类ID和所有的一级分类ID
                        for (var i = 0; i < this.subjectFirstList.length; i++) {
                            var firstSubject = this.subjectFirstList[i]
                            if (this.courseInfo.subjectParentId == firstSubject.id) {
                                // 获取一级分类下的所有二级分类
                                this.subjectSecondList = firstSubject.children
                            }
                        }
                    })
            })
    },

    // updateCourseInfoId() {
    //     course.updateCourseInfoId()
    //         .then(response => {

    //         })
    // }

    }
}
</script>
<style scoped>
    .tinymce-container {
        line-height: 29px;
    }
</style>