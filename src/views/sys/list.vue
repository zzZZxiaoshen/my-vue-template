<template>
  <div class="app-container">
    <!--用户列表页面头-->
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        clearable
        placeholder="用户名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="forceRefresh"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 5px"
        @click="handleCreate"
      >
        新增
      </el-button>
    </div>
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
  import {listSys} from '@/api/sys'
  import PreviewDialog from './components/PreviewDialog'
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import { parseTime } from '@/utils'

  export default {
    name: "list",
    components:{PreviewDialog,Pagination},
    directives: { waves },
    filters: {
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
    data() {
      return {
        total: 0,
        tableKey: '',
        list: null,
        listQuery: {},
        statusList:[],
        listLoading:false
      }
    },
    mounted() {
      //初始化加载用户列表数据
      this.getList();
    },
    created() {
      this.parseQuery()
    },
    //监听路由数据发生变化事件
    beforeRouteUpdate(to,from,next){
      //比较是不是相同路由地址
      if (to.path  ===from.path) {
        //如果是那么判断参数是否发生变化

        const newQuery = Object.assign({}, to.query)
        const oldQuery = Object.assign({}, from.query)
        if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
          this.getList()
        }
      }
      next()
    },
    methods:{
//-------------------------------------------------------功能函数----------------------------------------------------
      parseQuery() {
        const query = Object.assign({}, this.$route.query);

        let listQuery = {
          pageNo: 1,
          pageSize: 10,
          sort: '-id'
        };
        if (query) {
          query.pageNo && (query.pageNo = Number(query.pageNo))
          query.pageSize && (query.pageSize = Number(query.pageSize))

          listQuery = {
            ...listQuery,
            ...query
          }
        }
        this.listQuery = listQuery;
      },
//---------------------------------------------------------网络请求-------------------------------------------
      getList(){
        this.loading = true;
        listSys(this.listQuery).then(res => {
          const {
            listData, total
          } = res.data.data;
          this.list = listData;
          this.total = total;
          this.loading = false;
        })
      },
//---------------------------------------------------------事件绑定-------------------------------------------
      refresh(){
        this.$router.push({
          path: '/sys/list',
          query: this.listQuery
        })
      },
      handleFilter(){
        //根据条件请求刷新数据
        //初始化查询条件
        this.listQuery.pageNo = 1;
        //根据条件刷新页面
        this.refresh();
      },
      // 点击按条件查询
      forceRefresh() {
        window.location.reload();
        // this.getList();
      },
      handleCreate(){

      },
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
      handleUpdate(){
      },
      handleDelete(){
      }
    }
  }
</script>

<style scoped>

</style>
