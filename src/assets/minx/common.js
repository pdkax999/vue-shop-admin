export default {
  data(){
    return {
      categoryList:[]
    }
  },
  methods: {
    async getCategoryList(type) {
      const {
        pagenum,
        pagesize
      } = this

      if (type) {
        let list = await this.$API.reqGoodsCategorys()

        if (!list) return

        this.categoryList = list
       
        // this.processData(this.categoryList)
      } else {
        let result = await this.$API.reqGoodsCategorys(pagenum, pagesize)
        if (!result) return

        this.total = result.total
        this.tableData = result.result
      }
    },


  }





}
