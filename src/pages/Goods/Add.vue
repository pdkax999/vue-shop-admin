<template>
  <div class="addGoods">
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <el-button @click="$router.replace('/goods')" type="primary" size="mini">返回</el-button>
      <el-alert title="添加商品信息" type="info" show-icon close-text center></el-alert>
      <el-steps :space="200" :active="activeName*1" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs
        :tab-position="'left'"
        style="height: 200px;"
        v-model="activeName"
        :before-leave="tagHandleClick"
      >
        <el-tab-pane label="基本信息" name="0">
          <el-form :model="form" :rules="ruleForm">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_number">
              <el-input v-model="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_weight">
              <el-input v-model="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item prop="goods_cat">
              <div class="cate">
                <div id="title">商品分类</div>
                <el-cascader
                  ref="cascader"
                  expand-trigger="hover"
                  v-model="form.goods_cat_"
                  :style="{winth:'40%'}"
                  :options="categoryList"
                  :props="{label:`cat_name`,value: 'cat_id'}"
                  @change="handleChange"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <el-form>
            <el-form-item :label="many.attr_name" v-for="(many,index) in manyData" :key="index">
              <el-checkbox-group v-model="many.values" v-if="many.values.length>0">
                <el-checkbox :label="val" border v-for="(val,index) in many.values" :key="index"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <el-form>
            <el-form-item :label="only.attr_name" v-for="(only,index) in onlyData" :key="index">
              <el-input v-model="only.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            action="http://127.0.0.1:8888/api/private/v1/upload"
            :headers="{'Authorization':token}"
            :file-list="form.pics"
            list-type="picture"
            :on-success="handleSuccess"
            :on-remove="handelRemove"
            :on-preview="previewImg"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quillEditor v-model="form.goods_introduce"></quillEditor>
          <el-button @click="addGoods" type="primary" class="addGoods">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <div class="hg"></div>
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="50%">
      <img :src="src" alt width="100%" />
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { quillEditor } from 'vue-quill-editor'
import common from '../../assets/minx/common'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  mixins: [common],
  methods: {
    tagHandleClick(activeName) {
      // tag选项卡在tag变化前调用,此时activeName保存的值还是旧的
      if (this.form.goods_cat_.length !== 3) {
        this.$message.error('请先选择商品分类！')

        return false
      } else if (activeName == '1' || activeName == '2') {
        this.getParams(activeName)
      }
    },
    handleChange() {},
    async getParams(activeName) {
      const {
        form: { goods_cat_ }
      } = this

      let val = activeName == '1' ? 'many' : 'only'

      let reslut = await this.$API.reqParamsList(
        goods_cat_[goods_cat_.length - 1],
        [val]
      )

      if (!reslut) return

      if (val == 'many') {
        this.manyData = this.produceNewDate(reslut)
      } else {
        this.onlyData = this.produceNewDate(reslut)
      }
    },
    produceNewDate(data) {
      return (this.tableData = data.map(info => {
        info.inputVisible = false
        info.values = info.attr_vals.length > 0 ? info.attr_vals.split(' ') : []

        return info
      }))
    },
    handleSuccess({ data, meta }, file) {
      if (meta.status !== 200) {
        console.log(file)
        this.$message.error('图片上传失败')
        return
      }

      this.form.pics.push({
        url: data.url,
        name: file.name,
        pic: data.tmp_path
      })
    },

    handelRemove(file, fileList) {
      this.form.pics.splice(this.pics.indexOf(file.pic), 1)
    },
    previewImg(file) {
      console.log()
      this.src = file.url
      this.dialogVisible = true
    },
   async addGoods() {
      this.form.goods_cat=this.form.goods_cat_.toString()
      this.form.attr=this.manyData.concat(this.onlyData)

     let result = await this.$API.reqAddGoods(this.form);  

    if(result.meta.status!==201){

      this.$message.error(result.meta.msg)
      return
    }


    this.$message.success(result.meta.msg)

      this.$router.replace('/goods')
    }
  },
  mounted() {
    this.token = window.sessionStorage.getItem('token_key')
    this.getCategoryList(true)
  },
  data() {
    return {
      goods_introduce: '',
      activeName: '0',
      manyData: [],
      onlyData: [],
      form: {
        goods_name: '不负此生',
        goods_price: '123',
        goods_number: '123',
        goods_weight: '123',
        goods_cat_: [1, 3, 6],
        goods_introduce: '',
        pics: []
      },
      ruleForm: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请输入商品分类', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      token: '',

      src: ''
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang='less'>
.addGoods {
  .ql-editor {
    height: 276px;
  }
  .navigation {
    margin-bottom: 15px;
  }
  .el-card,
  .addGoods {
    margin-top: 15px;
  }
  .el-alert {
    margin: 15px 0;
  }
  .el-steps {
    margin-bottom: 20px;
  }
  .el-tabs {
    transform: translateX(-15px);
  }
  .el-form-item__label {
    margin-bottom: 15px;
  }
  .el-tab-pane {
    height: 100% !important;
  }
  .el-tabs {
    height: 100% !important;
  }
  .hg {
    height: 50px;
    // background-color: red;
  }
  .label.el-form-item__label:last-child {
    width: 100% !important;
  }

  .cate {
    #title {
      margin-bottom: 15px;
    }
  }
  .el-form-item .el-form-item__label {
    display: inline-block;
    float: none !important;
    margin-bottom: 10px !important;
  }
}
</style>
