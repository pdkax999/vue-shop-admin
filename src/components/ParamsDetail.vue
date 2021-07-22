<template>
  <div>
    <el-row>
      <el-col>
        <el-button
          type="primary"
          size="mini"
          :disabled="tableData.length==0"
          @click="openModel('add')"
        >{{'添加'+text}}</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-tag
            :key="tag"
            v-for="tag in row.values"
            closable
            :disable-transitions="false"
            @close="handleClose(tag,row)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="row.inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(row)"
            @blur="handleInputConfirm(row)"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ New Tag</el-button>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column :label="text+'名称'" prop="attr_name"></el-table-column>
      <el-table-column label="操作" prop="name">
        <template slot-scope="{row}">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="openModel('update',row)"
          >编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="getText" :visible.sync="dialogVisible" width="50%" @close="dialogClosed">
      <!-- 添加参数的对话框 -->
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="80px">
        <el-form-item :label="text=='参数' ? '动态参数' : '静态属性'" prop="attr_name">
          <el-input v-model="form.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    //重置表单
    dialogClosed() {
      this.$refs.formRef.resetFields()
      this.form.attr_name = ''
    },
    addParams() {
      this.$refs.formRef.validate(async isSuccess => {
        if (!isSuccess) return
        const {
          form: { attr_name },
          attr_sel,
          id,
          attr_id
        } = this //attr_sel数据标识尽量用后端传递过来的
        let reslut

        if (this.type == 'add') {
          reslut = await this.$API.reqAddParams(id, attr_name, attr_sel)
        } else {
          reslut = await this.$API.reqUpdateParams(
            id,
            attr_id,
            attr_name,
            attr_sel
          )
        }

        if (this.type == 'add') {
          if (reslut.meta.status !== 201) {
            this.$message({
              message: reslut.meta.msg,
              type: 'error'
            })
          } else {
            this.$message({
              showClose: true,
              message: reslut.meta.msg,
              type: 'success'
            })

            this.getParams()
            this.dialogVisible = false
          }
        } else {
          if (!result) return
          this.getParams()
          this.dialogVisible = false
        }
      })
    },
    openModel(type, row) {
      //修改或者添加
      this.type = type

      if (type != 'add') {
        this.form.attr_name = row.attr_name
        this.attr_id = row.attr_id
      }
      this.dialogVisible = true
    },
    async handleClose(tag, row) {
      const { attr_name, attr_id, values } = row
      const { attr_sel, id } = this

      let newValue = JSON.parse(JSON.stringify(values))

      newValue.splice(values.indexOf(tag), 1)

      let value = newValue.join(' ')

      let reslut = await this.$API.reqUpdateParams(
        id,
        attr_id,
        attr_name,
        attr_sel,
        value
      )
      if (!reslut) return
      values.splice(values.indexOf(tag), 1)
    },
    showInput(row) {
      row.inputVisible = true
      this.$nextTick(() => {
        //页面展现之后自动获取焦点
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    async handleInputConfirm(row) {
      const { attr_name, attr_id, values } = row
      const { attr_sel, id } = this
      let inputValue = this.inputValue
      let newValue = JSON.parse(JSON.stringify(values))
      if (!inputValue) {
        row.inputVisible = false
        this.inputValue = ''
        return
      } else if (newValue.indexOf(inputValue) !== -1) {
        this.$message.warning('不能添加重复参数')
        row.inputVisible = false
        this.inputValue = ''
        return
      }

      newValue.push(inputValue)

      let value = newValue.join(' ')

      let reslut = await this.$API.reqUpdateParams(
        id,
        attr_id,
        attr_name,
        attr_sel,
        value
      )

      if (!reslut) return

      values.push(inputValue)

      row.inputVisible = false
      this.inputValue = ''
    }
  },
  props: {
    text: {
      type: String
    },
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    attr_sel: {
      type: String
    },
    id: [String, Number],
    getParams: Function
  },
  computed: {
    getText() {
      const { type, text } = this
      let reslut
      if (type == 'add') {
        if (text == '参数') {
          reslut = '添加动态参数'
        } else {
          reslut = '添加静态属性'
        }
      } else {
        if (text == '参数') {
          reslut = '修改动态参数'
        } else {
          reslut = '修改静态属性'
        }
      }

      return reslut
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: { attr_name: '' },
      formRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      type: 'add', //对话框复用
      inputVisible: false,
      inputValue: ''
    }
  },
  watch: {
    tableData(val) {
      console.log(val)
    }
  }
}
</script>

<style lang='less' scope>
.cell {
  font-weight: bold;
  font-size: 12px;
}
.el-row {
  margin-bottom: 15px;
}
.el-tag {
  margin: 0 10px;
}

.el-table .input-new-tag {
  width: 130px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
