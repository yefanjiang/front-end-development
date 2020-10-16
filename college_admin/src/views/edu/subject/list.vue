<template>
    <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
        ref="subjectTree"
        :data="subjectList"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
    />

    </div>
</template>

<script>
import subject from '@/api/subject/subject.js'
export default {

    data() {
        return {
            filterText: '',
            subjectList: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    created() {
        this.getAllsubjectList()
    },

    watch: {
        filterText(val) {
            this.$refs.subjectTree.filter(val)
        }
    },

    methods: {
        getAllsubjectList() {
            subject.getSubjectList()
                .then(response => {
                    this.subjectList = response.data.list
                })
        },

        filterNode(value, data) {
            if (!value) return true
            return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
    }
}
</script>

