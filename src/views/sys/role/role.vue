<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">New Role</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Role Key" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="remark">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <pagination
      v-show="total > 0"
      :total="total"
      :pageNo.sync="listQuery.pageNo"
      :limit.sync="listQuery.pageSize"
      :hidden="true"
      @pagination="refresh"
    />

    <el-dialog :visible.sync="dialogVisible"  :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" :rules="rules" label-position="left"  ref="postForm" >
        <el-form-item label="roleName" prop="roleName" >
          <el-input v-model="role.roleName" placeholder="Role Name"/>
        </el-form-item>
        <el-form-item label="remark" prop="remark">
          <el-input
            v-model="role.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole('postForm')" v-loading="loading">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import path from 'path'
  import { deepClone } from '@/utils'
  import {listRole, listPermission,createRole,savePermissionTree} from '@/api/sys.js'
  import Pagination from '@/components/Pagination'

  const defaultRole = {
    roleName: '',
    remark: '',
    routes: []
  }

  const mappingRule={
    roleName:"角色名称",
    remark:"备注",
  }

  export default {
    name: "role",
    components: {Pagination},
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: mappingRule[rule.field] + '为必传项', type: 'error'
          })
          callback(new Error(mappingRule[rule.field] + '为必传项'))
        } else {
          callback()
        }
      }
      return {
        rolesList: [],
        routes: [],
        routesCheckArr:[],
        role: {},
        loading: false,
        listQuery: {},
        total: 0,
        dialogVisible: false,
        dialogType: '',
        checkStrictly: false,
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        rules: {
        roleName:[{validator:validateRequire}],
        remark:[{validator:validateRequire}]
        }
      }
    },
    computed: {
      routesData() {
        return this.routes
      }
    },
    mounted() {
    //获取路由权限信息
      this.getRoute();
    //获取权限信息
      this.getRoles();
    },
    created() {
      this.parseQuery();
    },
    methods: {
      //-------------------------------------------------------功能函数----------------------------------------------------
      generateRoutesCheck(routes, basePath = '/', checkedKeys,roleId) {
        for (const route of routes) {
          const path = route.permission;
          if (checkedKeys.includes(path)) {
            console.log(path)
            let saveRoute = {};
            saveRoute.roleId = roleId
            saveRoute.permId = route.id
            this.routesCheckArr.push(saveRoute)
          }
          // recursive child routes
          if (route.children) {
            this.generateRoutesCheck(route.children, null, checkedKeys, roleId)
          }
        }
      },
      // reference: src/view/layout/components/Sidebar/SidebarItem.vue
      onlyOneShowingChild(children = [], parent) {
        let onlyOneChild = null
        const showingChildren = children.filter(item => !item.visible);


        // When there is only one child route, the child route is displayed by default
        if (showingChildren.length === 1) {
          onlyOneChild = showingChildren[0]
          onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
          return onlyOneChild
        }

        // Show parent if there are no child route to display
        if (showingChildren.length === 0) {
          onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          return onlyOneChild
        }

        return false
      },
      replaceRouteInfo(data){
        for (const route in data) {
          data[route].permission = data[route].permission.replace(/\:/g, '/')
          if (data[route].children) {
            this.replaceRouteInfo(data[route].children)
          }
        }
      },
      generateRoutes(routes, basePath = '/') {
        const res = [];
        for (let route of routes) {
          // skip some route
          if (!route.visible) { continue }

          // const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

          // if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          //   route = onlyOneShowingChild
          // }

          const data ={
            path: route.permission,
            title: route.name //route.meta.name
          }
          // recursive child routes
          if (route.children) {
            data.children =this.generateRoutes(route.children,data.path)
          }
          res.push(data)
        }
        return res;
      },
      parseQuery() {
        const query = Object.assign({}, this.$route.query);

        let listQuery = {
          pageNo: 1,
          pageSize: 10,
          sort: '-id',
          tab: 1
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
      //---------------------------------------网络请求---------------------------------------------
      //请求所有权限路由
      getRoute() {
        listPermission().then(res => {
          let data = res.data.data;

          //处理替换后端返回不符合要求权限路由字符串信息
          this.replaceRouteInfo(data.permissionDtos);
          // 保存业务层返回的路由数据结构
          this.serviceRoutes = data.permissionDtos
          //生成路由
          this.routes = this.generateRoutes(data.permissionDtos)

        })
      },
      //请求角色
      getRoles() {
        this.loading = true;
        listRole(this.listQuery).then(res => {
          const {
            listData, total
          } = res.data.data;
          this.rolesList = listData;
          this.total = total;
          this.loading = false;
        })
      },
      //---------------------------------------事件绑定---------------------------------------------
      //新增角色
      handleAddRole() {
        this.role = Object.assign({}, defaultRole);
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedNodes([])
        }
        this.dialogType = ' NEW'
        this.dialogVisible = true
      },
      //角色编辑
      handleEdit() {
        this.dialogType = 'edit'
        this.dialogVisible=true
        this.checkStrictly=true

      },
      handleDelete() {

      },
      refresh() {

      },
      //新增角色 保存角色按钮
       confirmRole(formName) {
        console.log("保存角色")
        this.loading = true;
        //构建保存角色信息
        const role = Object.assign({}, this.role);
        debugger
        this.$refs[formName].validate(async(validate)=>{
        const {data} = await createRole(role)
        const roleId = data.data.roleId
        this.rolesList.push(this.role)
        this.loading = false;
        this.dialogVisible = false
        //构建保存路由权限信息
        const checkedKeys = this.$refs.tree.getCheckedKeys()
        this.generateRoutesCheck(deepClone(this.serviceRoutes), '/', checkedKeys,roleId)
        await savePermissionTree(this.routesCheckArr)
        })
      }
    }
  }
</script>

<style scoped>

</style>
