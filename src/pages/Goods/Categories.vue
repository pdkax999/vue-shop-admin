<template>
  <div id="cate">
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="openCategoryModel">添加分类</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
        <el-table-column prop="name" label="是否有效" width="180">
          <template slot-scope="scope">
            <i class="el-icon-success" style="color: lightgreen;" v-if="!scope.row.cat_deleted"></i>
            <i class="el-icon-error" style="color: red;" v-else></i>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level===0" size="mini">一级</el-tag>
            <el-tag v-if="scope.row.cat_level===1" size="mini" type="success">二级</el-tag>
            <el-tag v-if="scope.row.cat_level===2" size="mini" type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button icon="el-icon-delete" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog :title="'分配权限'" :visible.sync="dialogFormVisible" @close="closeModel">
      <el-form :model="form" :rules="rules" ref="form" label-width="90px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            ref="cascader"
            v-model="value"
            clearable
            :options="categoryList"
            :props="{ expandTrigger: 'hover',label:`cat_name`,value: 'cat_id',checkStrictly: true}"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="updateGoodsList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    async getCategoryList(type) {
      const { pagenum, pagesize } = this

      if (type) {
        let list = await this.$API.reqGoodsCategorys()

        if (!list) return

        this.categoryList = list
        this.processData(this.categoryList)
      } else {
        let result = await this.$API.reqGoodsCategorys(pagenum, pagesize)
        if (!result) return

        this.total = result.total
        this.tableData = result.result
      }
    },
    handleSizeChange(a) {
      this.pagesize = a
      this.getCategoryList()
    },
    handleCurrentChange(a) {
      this.pagenum = a
      this.getCategoryList()
    },
    async updateGoodsList() {
      const {
        value,
        form: { cat_name }
      } = this

      let cat_pid = value.length == 0 ? 0 : value[value.length - 1]

      let cat_level = value.length

      let reslut = await this.$API.reqAddUserRigths(
        cat_pid,
        cat_name,
        cat_level
      )
      if (reslut.meta.status !== 201) return
      this.$message({
        message: '添加分类成功',
        type: 'success',
        duration: 1000
      })
      this.getCategoryList()
      this.dialogFormVisible = false
    },
    closeModel() {
      this.$refs.form.resetFields()
      this.form = {
        cat_name: ''
      }
      this.value = []
    },

    handleChange(value) {
      console.log(value)
    },
    //删除第三级分类
    processData(data) {
      data.forEach(cate => {
        if (!cate.children) return

        cate.children.forEach(item => {
          delete item.children
        })
      })
    },
    openCategoryModel() {
      this.getCategoryList(true)

      this.dialogFormVisible = true
    }
  },
  created() {
    this.getCategoryList()
  },
  data() {
    return {
      tableData: [],
      categoryList: [],
      total: 0,
      pagenum: 1,
      pagesize: 5,
      dialogFormVisible: false,
      form: { cat_name: '' },
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      value: []
    }
  }
}
</script>

<style lang='less'>
#cate {
  .navigation {
    margin-bottom: 15px;
  }
  .el-table {
    margin-top: 15px;
  }
  .el-cascader {
    width: 100%;
  }
}

.el-cascader-panel .el-radio {
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  top: 10px;
  right: 10px;
}
.el-cascader-panel .el-radio__input {
  visibility: hidden;
}
</style>
