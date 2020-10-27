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

      <el-table-column label="图片" width="150" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.image">
            <img
              :src="scope.row.image"
              style="width:120px;height:180px"
            >
          </a>
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="adress" width="150" align="center"/>
      <el-table-column label="状态" prop="status" width="100" align="center"/>
      <el-table-column label="活动类型" prop="type" align="center"/>
      <el-table-column label="开始时间" prop="startTime" align="center"/>
      <el-table-column label="结束时间" prop="startTime" align="center"/>
      <el-table-column label="人数" prop="amount" align="center"/>
      <el-table-column label="描述" prop="describe" align="center"/>

      <el-table-column label="操作" width="120" align="center" fixed="right">
        <template slot-scope="{row}">
          <PreviewDialog title="电子书信息" :data='row'>
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
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
  </div>
</template>

<script>
  import {listActive} from '@/api/active'
  import PreviewDialog from './components/PreviewDialog'
  import Pagination from '@/components/Pagination'
  /* eslint-disable */
  export default {
    name: "ActiveList",
    components:{PreviewDialog,Pagination},
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
          query.page && (query.page = Number(query.page))
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
          return v.replace(new RegExp(this.listQuery[k], 'ig'), v => {
            hightlight(v);
          })
        }
      },
      // 配置路由参数回显功能函数
      refresh() {
        // debugger
        this.$router.push({
          path: '/book/list',
          query: this.listQuery
        })
      },
//-----------------------------------------------------网络请求----------------------------------------------------
      getList() {
        this.loading = true;
        listActive(this.listQuery).then(res => {
          const {
            data, total
          } = res;
          this.list = data;
          this.total = total;
          this.loading = false;
          this.list.forEach(active => {
            active.titleWrapper = this.wrapperKeyword('title', active.title);
          })
        })
      },
//-----------------------------------------------------点击事件----------------------------------------------------
      handleFilter() {
      },
      forceRefresh() {
      },
      handleCreate() {
      },
      sortChange() {
      },
      getSortClass() {

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
