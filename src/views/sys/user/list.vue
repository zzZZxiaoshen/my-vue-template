<template>
  <div class="tab-container app-container">

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
    <el-tag>mounted times ：{{ createdTimes }}</el-tag>
    <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="用户列表" type="success" />

<!--    用户列表渲染-->
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :list="list" :list-query="listQuery"
           :type="item.key" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {listSys} from '@/api/sys'
  import waves from '@/directive/waves' // waves directive
  import TabPane from './components/TabPane'

  import { parseTime } from '@/utils'

  export default {
    name: "list",
    components:{TabPane},
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
        activeName: 'admin',
        createdTimes: 0,
        tabMapOptions: [
          { label: '启用', key: '1' },
          { label: '禁用', key: '0' },
        ],
        listQuery: {},
        statusList:[],
        list:null
      }
    },
    mounted() {
      this.getList()
    },
    watch: {
      activeName(val) {
        this.listQuery.tab=val
        this.$router.push(`${this.$route.path}?tab=${val}`)
      }
    },
    created() {
      // init the default selected tab
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
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
        // this.$emit('create') // for test
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
          path: '/sys/user/list',
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
      handleUpdate(){
      },
      handleDelete(){
      },
      showCreatedTimes(){
        this.createdTimes = this.createdTimes + 1
      }
    }
  }
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
