<template>
  <div class="app-container">
    <!--用户列表页面头-->
<!--    <div class="filter-container">-->
<!--      <el-input-->
<!--        v-model="listQuery.username"-->
<!--        clearable-->
<!--        placeholder="用户名"-->
<!--        style="width: 200px;"-->
<!--        class="filter-item"-->
<!--        @keyup.enter.native="handleFilter"-->
<!--        @clear="handleFilter"-->
<!--        @blur="handleFilter"-->
<!--      />-->
<!--      <el-button-->
<!--        v-waves-->
<!--        class="filter-item"-->
<!--        type="primary"-->
<!--        icon="el-icon-search"-->
<!--        style="margin-left: 10px"-->
<!--        @click="forceRefresh"-->
<!--      >-->
<!--        查询-->
<!--      </el-button>-->
<!--      <el-button-->
<!--        class="filter-item"-->
<!--        type="primary"-->
<!--        icon="el-icon-edit"-->
<!--        style="margin-left: 5px"-->
<!--        @click="handleCreate"-->
<!--      >-->
<!--        新增-->
<!--      </el-button>-->
<!--    </div>-->
    <!--活动列表页面头-->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        clearable
        placeholder="活动名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-select
        v-model="listQuery.status"
        placeholder="状态"
        clearable
        class="filter-item"
        style="margin-left: 5px"
        @change="handleFilter"
      >
        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.label"/>
      </el-select>
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
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import { parseTime } from '@/utils'

  export default {
    name: "list",
    components:{Pagination},
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
          path: '/test/list',
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
      sortChange(){

      },
      getSortClass(){
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
