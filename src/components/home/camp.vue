<template>
  <div style="margin: 0 12%">
    <div>
      <el-card
        shadow="hover"
        v-for="(item,index) in camps"
        :key="index"
        style="margin-bottom: 10px"
      >
        <div style="display: flex;flex-direction: row">
          <el-image
            style="width: 20%;margin-right: 10px"
            :src="item.image"
            fit="cover"
          ></el-image>
          <div style="width:80%;display: flex;flex-direction: column">
            <span class="title">{{item.title}}</span>
            <span>{{item.content}}</span>
            <span class="date">{{item.date}}</span>
            <el-link
              type="primary"
              :href="item.link"
              target="_blank"
            >
              新闻链接
            </el-link>
          </div>
        </div>
      </el-card>
      <div class="center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev,pager,next"
          background
          :total=currentTotal
          :page-size=pageSize
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Camp',
    data() {
      return {
        camps: [],//显示夏令营信息
        allCamps: [],//全部夏令营信息
        currentPage: 1,
        currentTotal: 47,
        pageSize: 4
      }
    },
    methods: {
      handleSizeChange: function(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange: function(val) {
        this.currentPage = val;
        console.log(`当前页：${val}`);
        this.setCamps(val);
      },

      setCamps: function(val) {
        const cps = this.allCamps;
        this.camps = [];
        for (let i = val; i < val + 4; i++) {
          this.camps.push({
            content: cps[i].content,
            title: cps[i].title,
            date: cps[i].date,
            image: cps[i].image === null ? 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' : cps[i].image,
            link: cps[i].officialLink
          });
        }
      }
    },
    created() {
      this.$axios.get("/api/base/summer-camp")
        .then((res) => {
          this.allCamps = res.data.data;
          this.setCamps(0);
        });
    },
  }
</script>

<style scoped>
  .el-link {
    width: 10%;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
  }

  .date {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
</style>
