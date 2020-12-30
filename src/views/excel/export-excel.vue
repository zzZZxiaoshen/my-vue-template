<template>
  <div class="app-container">
  <div>
    <FilenameOption  v-model="filename"/>
    <AutoWidthOption v-model="autoWidth"/>
    <BookTypeOption v-model="bookType"/>
    <el-button :loading="downloadLoading"  style="margin:0 0 20px 20px;" type="primary"
               icon="el-icon-document" @click="handleDownload">Export Excel </el-button>
    <a href="https:www.baidu.com" target="_blank" style="margin-left:15px;">
      <el-tag type="info">Documentation</el-tag>
    </a>
  </div>

    <!--用户列表渲染-->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column label="用户名" prop="username" width="150" align="center"/>
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
 import  FilenameOption from './components/FilenameOption'
 import  AutoWidthOption from './components/AutoWidthOption'
 import  BookTypeOption from './components/BookTypeOption'
 import Pagination from '@/components/Pagination'

 import {listSys} from '@/api/sys'
 import { parseTime } from '@/utils'



    export default {
        name: "export-excel",
        components:{FilenameOption,AutoWidthOption,BookTypeOption,Pagination},
        filters: {
          timeFiler(time){
            if (time) {
              return parseTime(time, '{y}-{m}-{d} {h}:{i}');
            } else {
              return '无'
            }
          },
        },
        data(){
          return {
            filename: '',
            autoWidth:true,
            bookType: 'xlsx',
            downloadLoading:false,
            listLoading:false,
            total:0,
            listQuery: {},
            list:[]
          }
        },
        mounted() {
          this.getList()
        },
        created() {
          this.parseQuery()
        },
        //监听路由数据发生变化事件
        // beforeRouteUpdate(to,from,next){
        //   //比较是不是相同路由地址
        //   if (to.path  ===from.path) {
        //     //如果是那么判断参数是否发生变化
        //     const newQuery = Object.assign({}, to.query)
        //     const oldQuery = Object.assign({}, from.query)
        //     if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        //       this.getList()
        //     }
        //   }
        //   next()
        // },
        methods:{
          parseQuery() {
            const query = Object.assign({}, this.$route.query);

            let listQuery = {
              pageNo: 1,
              pageSize: 10,
              sort: '-id',
              tab:1
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
          //点击导出excel
          handleDownload(){
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel =>{
              const tHeader =['ID','Username','Avatar','GmtCreate','Deleted','Desc','Tel','Email']
              const filterVal =['id','username','avatar','gmtCreate','deleted','desc','tel','email']
              const list = this.list;
              const data = this.formatJson(filterVal, list);
              debugger
              excel.export_json_to_excel({
                header: tHeader,
                data,
                filename:this.filename,
                // autoWidth: this.autoWidth,
                bookType: this.bookType
              })
              this.downloadLoading = false
            })
          },
          refresh(){
            this.$router.push({
              path: '/excel/export-excel',
              query: this.listQuery
            })
          },
          formatJson(filterValue,list){
           return  list.map(v=> filterValue.map(j=>{
              if (j === 'gmtCreate') {
                return parseTime(v[j]);
              } else {
                return  v[j]
              }
            }))
          }
        }
    }
</script>

<style >
  .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
  }
</style>
