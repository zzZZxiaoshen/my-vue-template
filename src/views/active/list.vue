<template>
  <div class="app-container">
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
    <!--活动列表渲染-->
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
      <el-table-column label="标题" width="150" align="center">
        <template slot-scope="{ row: { titleWrapper }}">
          <span v-html="titleWrapper"/>
        </template>
      </el-table-column>

      <el-table-column label="图片" width="130px" align="center" >
        <template slot-scope="scope">
          <a :href="scope.row.image">
            <img
              :src="scope.row.image+1"
              style="width:80px;height:80px"
            >
          </a>
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="address" width="150" align="center"/>
      <el-table-column label="活动状态" prop="status" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.status == "0" ? '已结束' : '进行中'}}
        </template>
      </el-table-column>
      <el-table-column label="活动类型" p·rop="type" align="center">
        <template slot-scope="scope">
          <el-tag style="margin:0 2px" type="success">{{scope.row.tabType.typeName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="活动时间"  align="center" width="200px">
        <template slot-scope="scope">
          <el-tag style="margin:2px 2px" class="tag_time" type="success">
            <span>开始时间:{{ scope.row.startTime | timeFiler }}</span>
          </el-tag>
          <el-tag style="margin:2px 2px" class="tag_time" type="success">
            <span>结束时间:{{ scope.row.endTime | timeFiler }}</span>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="人数" prop="amount" align="center"/>
      <el-table-column label="描述"
                       :show-overflow-tooltip = true
       prop="describe" align="center"/>
      <el-table-column label="操作" width="120" align="center" fixed="right">
        <template slot-scope="{row}">
          <PreviewDialog title="活动信息" :data='row'>
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
  import {listActive} from '@/api/active'
  import PreviewDialog from './components/PreviewDialog'
  import Pagination from '@/components/Pagination'

  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  /* eslint-disable */
  export default {
    name: "ActiveList",
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
        listQuery: {},
        categoryList: [],
        tableKey: '',
        listLoading: false,
        list: null,
        total: 0,
        statusList:[
          {
            value:0,
            label:'结束'
          },
          {
            value:1,
            label:'进行中'
          }
        ]

      }
    },
    mounted() {
      //初始化加载分类列表数据
      this.getList();
      //初始化加载分类
      // this.getCategoryList();
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
    methods: {
//-----------------------------------------------------功能函数----------------------------------------------------
      parseQuery() {
        const query = Object.assign({}, this.$route.query);

        let listQuery = {
          pageNo: 1,
          pageSize: 20,
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
      wrapperKeyword(k, v) {
        function hightlight(value) {
          return '<span style="color: #1890ff">' + value + '</span>'
        }

        if (!this.listQuery[k]) {
          return v;
        } else {
          return v.replace(new RegExp(this.listQuery[k], 'ig'), v => hightlight(v))
        }
      },
      // 配置路由参数回显功能函数
      refresh() {
        this.$router.push({
          path: '/active/list',
          query: this.listQuery
        })
      },
      sortById(order) {
        if (order === 'descending') { //降序
          this.listQuery.sort = '+id';
        } else {
          this.listQuery.sort = '-id'
        }
        this.handleFilter()
      },
//-----------------------------------------------------网络请求----------------------------------------------------
      getList() {
        this.loading = true;
        listActive(this.listQuery).then(res => {
          const {
            listData, total
          } = res.data.data;
          this.list = listData;
          this.total = total;
          this.loading = false;
          this.list.forEach(active => {
            active.titleWrapper = this.wrapperKeyword('title', active.title);
          })
        })
      },
//-----------------------------------------------------点击事件----------------------------------------------------
      handleFilter() {
        //根据条件请求刷新数据
        //初始化查询条件
        this.listQuery.pageNo = 1;
        //根据条件刷新页面
        this.refresh();
      },
      // 点击按条件查询
      forceRefresh() {
        // window.location.reload();
        this.getList();
      },
      handleCreate() {
      },
      //点击触发表格排序功能
      sortChange(key) {
        const {prop, order} = key;
        //descending 降序 ascending 升序
        if (prop === 'id') {
          this.sortById(order);
        }
      },
      // 获取排序点击的列 ，然后进行列表渲染 此处是为了维护css渲染class
      getSortClass(key) {
        const sort = this.listQuery;
        return sort  === `+${key}` ?
          "ascending":
              sort === `-${key}` ?'descending':''
      },
      handleUpdate(){
      },
      handleDelete(){
      },

    }
  }
</script>

<style scoped>

</style>
