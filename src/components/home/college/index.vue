<template>
  <div>
    <div
      class="sch-divstyle"
      style="padding: 5px 0;margin-top:10px"
    >
      <div
        class="bor1"
        style="border-bottom: 3px solid #163172;margin: 0"
      >
        <div style="background-color:#163172;height:60px;margin-left: 0;margin-right: 0;">
          <div>
            <el-button
              class="row-style"
              type="text"
              @click="clickBack()"
              icon="el-icon-back"
              style="float: left;background-color: transparent;color: #ffffff;font-size: 22px;height: 60px;font-weight: bold;"
            >
            </el-button>
          </div>
          <div style="margin-left: 15px">
            <p
              class="schoola"
              style="margin-left: 20px"
            >
              {{this.schoolDetails.cid}}
              {{this.schoolDetails.cname}}
              {{this.schoolDetails.level}}
            </p>
          </div>
        </div>
        <div
          class="mess"
          style="padding: 5px;margin-top: 10px"
        >
          <p style="font-family: 宋体;font-weight:bold;">地区:{{this.schoolDetails.location}}</p>
          <br>
          <p style="font-family: 宋体;font-weight:bold;">简介:{{this.schoolDetails.introduction}}</p>
          <br>
        </div>
      </div>
      <div class="box-card">
        <div class="title">
          <p class="pstylea">最新排名:</p>
        </div>
        <table class="tableStyle">
          <thead style="line-height:50px">
          <th>数据来源</th>
          <th>排名</th>
          <th>更新日期</th>
          </thead>
          <tr
            v-for="(item, index) in ranks"
            :key="index"
            style="text-align:center;line-height:30px"
            :class="{table:index%2===0}"
          >
            <td>{{item.rankFrom||'无数据'}}</td>
            <td>{{item.rank||'无数据'}}</td>
            <td>{{item.date||'无数据'}}</td>
          </tr>
          <tr>
            <td
              colspan="3"
              v-show="ranks== undefined || ranks.length <= 0 "
              style="text-align:center;line-height:50px;"
            >暂无数据
            </td>
          </tr>
        </table>
        <br>
      </div>
      <div class="box-card">
        <div class="title">
          <p class="pstylea">近五年录取率:</p>
        </div>
        <table class="tableStyle">
          <thead style="line-height:50px">
          <th>年份</th>
          <th>考研人数</th>
          <th>录取人数</th>
          <th>保研人数</th>
          <th>保研率</th>
          <th>录取率</th>
          </thead>
          <tr
            v-for="(item, index) in rates"
            :key="index"
            style="text-align:center;line-height:30px"
            :class="{table:index%2===0}"
          >
            <td>{{item.year}}</td>
            <td>{{item.total}}</td>
            <td>{{item.enrollment}}</td>
            <td>{{item.exemption}}</td>
            <td>{{item.exemptionRate}}</td>
            <td>{{item.enrollmentRate}}</td>
          </tr>
          <tr>
            <td
              colspan="6"
              v-show="rates== undefined || rates.length <= 0 "
              style="text-align:center;line-height:50px"
            >
              暂无数据
            </td>
          </tr>
        </table>
        <br>
      </div>
      <div class="box-card">
        <div class="title">
          <p class="pstylea">最新学科评估结果:</p>
        </div>
        <table class="tableStyle">
          <thead style="line-height:50px">
          <th>学科名称及代码</th>
          <th>评估结果</th>
          <th>参评轮次</th>
          </thead>
          <tr
            v-for="(item, index) in evaluation.slice(0,5)"
            :key="index"
            style="text-align:center;line-height:30px"
            :class="{table:index%2===0}"
          >
            <td>{{item.mid+getMajorName(item.mid)}}</td>
            <td>{{item.result}}</td>
            <td>第四轮</td>
          </tr>
          <tr>
            <td
              colspan="3"
              v-show="evaluation == undefined || evaluation.length <= 0 "
              style="text-align:center;line-height:50px"
            >暂无数据
            </td>
          </tr>
        </table>
        <br>
      </div>
      <div style="margin-top: 30px;">
        <div class="title">
          <p class="pstylea">导师信息:</p>
        </div>
        <table class="tableStyle">
          <thead>
          <th>导师姓名</th>
          <th>招生专业</th>
          <th>研究方向</th>
          <th>联系电话</th>
          <th>邮箱地址</th>
          </thead>
          <tr
            v-for="(item, index) in tutors"
            :key="index"
            style="text-align:center;line-height:30px"
            :class="{table:index%2===0}"
          >
            <td> {{item.name}}</td>
            <td>{{getMajorName(item.mid)}}</td>
            <td>{{item.research}}</td>
            <td>{{item.contactPhone}}</td>
            <td>{{item.contactEmail}}</td>
          </tr>
          <tr>
            <td
              colspan="5"
              v-show="tutors == undefined || tutors.length <= 0 "
              style="text-align:center;line-height:50px"
            >暂无数据
            </td>
          </tr>
        </table>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    schoolDetail,
    getEvaluationList,
    majorList,
    rankList,
    rateList,
    tutorList,
  } from '@/assets/lib/getResultLjm';

  import {getCookie} from "@/assets/lib/utils";

  export default {
    name: 'College',
    data() {
      return {
        isIdentity: "",
        schoolCid: [],
        schoolDetails: [],
        evaluation: [],
        allMajors: [],
        ranks: [],
        rates: [],
        tutors: [],
        favorTutors: [],
      }
    },
    methods: {
      getSchoolDetail: function(cid) {
        const arr = this;
        schoolDetail(cid)
          .then((res) => {
            console.log("res", res);
            arr.schoolDetails = res[0];
            console.log("schoool_details" + this.schoolDetails.cname);
          });
      },
      getEvaluation: function(cid) {
        const arr = this;
        arr.evaluation = [];
        getEvaluationList(4)
          .then((res) => {
            for (let i = 0; i < res.length; i++) {
              if (res[i].cid === cid) {
                arr.evaluation.push(res[i]);
              }
            }
          });
      },
      getMajorListAll: function() {
        const arr = this;
        majorList()
          .then((res) => {
            arr.allMajors = res;
          });
      },
      getMajorName: function(mid) {
        const arr = this;
        for (let i = 0; i < arr.allMajors.length; i++) {
          if (arr.allMajors[i].mid === mid) {
            return arr.allMajors[i].mname;
          }
        }
      },
      getRank: function(cid) {
        const arr = this;
        rankList(cid)
          .then((res) => {
            arr.ranks = res;
            console.log("rank", this.ranks);
          });
      },
      getRates: function(cid) {
        const arr = this;
        rateList(cid)
          .then((res) => {
            arr.rates = res;
            console.log("rate", this.rates);
          });
      },
      getTutors: function(cid) {
        const arr = this;
        tutorList(cid)
          .then((res) => {
            arr.tutors = res;
          });
      },
      clickBack: function() {
        this.$router.go(-1);//返回上一层
      }
      /*
      setFavorTutor(cid, tid) {
        this.favorTutors = [];
        this.favorTutors.push({
          tutCid: cid,
          tutTid: tid,
        });
        setFavouriteTutor(this.favorTutors).then(res => {
          //  console.log(res);
          console.log("状态码" + res.status);
          if (res.status === 200) {
            console.log("全部收藏成功！");
            this.$message("全部收藏成功！");
          } else if (res.status === 400) {
            console.log("收藏失败！");
            this.$message("收藏失败！");
          } else if (res.status === 1090) {
            console.log("部分收藏成功！");
            this.$message("部分收藏成功！")
          }
        })
      }
       */
    },
    mounted() {
      this.isIdentity = getCookie('uid');
    },
    activated() {
      const self = this;
      self.schoolCid = [];
      self.schoolCid.push(self.$route.params.cid);
      // self.schoolCid.push(self.$store.state.cid);
      self.getSchoolDetail(self.schoolCid);
      self.getRank(self.schoolCid[0]);
      self.getRates(self.schoolCid[0]);
      self.getEvaluation(self.schoolCid[0]);
      self.getMajorListAll();
      self.getTutors(self.schoolCid[0]);
      self.isidentity = getCookie('uid');
    },
  }
</script>

<style scoped>
  .row-style {
    color: gray;
    width: 3%;
    float: left;
  }

  .schoola {
    line-height: 60px;
    font-weight: bold;
    font-size: 18px;
    color: white;
    margin-left: 10px
  }

  .title {
    margin-left: 0;
    margin-right: 300px;
    height: 40px;
  }

  .pstylea {
    font-weight: bold;
    margin-left: 10px;
    font-size: 18px;
  }

  .table {
    background: #d6e4f0;
  }

  .box-card {
    margin-top: 30px;
    border-bottom: 3px solid #163172;
  }

  /* Table Head */
  .tableStyle thead th {
    background-color: rgb(81, 130, 187);
    color: #fff;
    border-bottom-width: 0;
    line-height: 30px;
    font-weight: bold;
  }

  /* Column Style */
  .tableStyle td {
    color: #000;
  }

  /* Heading and Column Style */
  .tableStyle tr, .tableStyle th {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(81, 130, 187);
  }

  /* Padding and font style */
  .tableStyle td, .tableStyle th {
    padding: 5px 10px;
    font-size: 12px;
    font-family: Verdana;

  }

  .tableStyle {
    width: 60%;
    margin-bottom: 10px;
    margin-left: 80px;
    margin-top: 20px;
  }
</style>
