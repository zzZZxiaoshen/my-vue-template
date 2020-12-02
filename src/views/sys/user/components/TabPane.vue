<template>
  <div>
    <!--用户列表渲染-->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      />
      <el-table-column label="用户名" prop="username" width="150" align="center"/>

      <el-table-column label="头像" width="130px" align="center" >
        <template slot-scope="scope">
          <a :href="scope.row.avatar">
            <img
              :src="scope.row.avatar"
              style="width:80px;height:80px"
            >
          </a>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"  align="center" width="200px">
        <template slot-scope="scope">
          <el-tag style="margin:2px 2px" class="tag_time" type="success">
            <span>{{ scope.row.gmtCreate | timeFiler }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="deleted" align="center">
        <template slot-scope="scope">
          {{scope.row.status == "0" ? '禁用' : '启用'}}
        </template>
      </el-table-column>
      <el-table-column label="描述"
                       :show-overflow-tooltip = true
                       prop="desc" align="center"/>
      <el-table-column label="电话" prop="tel" width="150" align="center"/>
      <el-table-column label="邮箱" prop="email" width="150" align="center"/>
      <el-table-column label="操作" width="120" align="center" fixed="right">
        <template slot-scope="{row}">
          <PreviewDialog title="用户信息" :data='row'>
            <el-button type="text" icon="el-icon-view"/>
          </PreviewDialog>
          <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)"/>
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"/>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination
      v-show="total > 0"
      :total="total"
      :pageNo.sync="listQuery.pageNo"
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import PreviewDialog from './PreviewDialog'

import { parseTime } from '@/utils'


export default {
  components:{Pagination,PreviewDialog},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    timeFiler(time){
      if (time) {
        return parseTime(time, '{y}-{m}-{d} {h}:{i}');
      } else {
        return '无'
      }
    },
    valueFilter(value) {
      if (value) {
        return value;
      } else {
        return  '无'
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'admin'
    },
    list:null,
    listQuery:{},
    total: {
      type:Number,
      default: 0
    }
  },
  data() {
    return {

      tableKey: '',
      statusList:[],
      listLoading:false
    }
  },
  created() {

  },

  methods: {
//---------------------------------------------------------功能函数-------------------------------------------

//---------------------------------------------------------网络请求-------------------------------------------

//---------------------------------------------------------事件------------------------------------------------
    sortChange(key){
      const {prop, order} = key;
      //descending 降序 ascending 升序
      if (prop === 'id') {
        this.sortById(order);
      }
    },
    sortById(order) {
      if (order === 'descending') { //降序
        this.listQuery.sort = '+id';
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    getSortClass(key){
      const sort = this.listQuery.sort;
      return sort  === `+${key}` ?
        "ascending":
        sort === `-${key}` ?'descending':''
    },
    refresh(){
      this.$router.push({
        path: '/sys/user/list',
        query: this.listQuery
      })
    },
    handleUpdate(row){
      this.$router.push(`/sys/user/edit/${row.email}`)
    },
  }
}
</script>

