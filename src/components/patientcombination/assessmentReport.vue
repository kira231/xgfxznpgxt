<template>
  <div class="reportcard">
    <div class="reportheader">
      <div v-if="role=='patient'&&qflag">
        <span style="float:right;padding-right:20px;"
              @click="$router.push({name:'/patient/dailyreport',query:{id:$route.query.id}})">
          每日上报</span><br>
      </div>
      <div class="updatetime">更新时间:&nbsp;&nbsp;{{evform.SubmitDate}}</div>
      <div v-if="role=='patient'&&qflag"
           class="updateinfo"
           @click="$router.push({name:'/patient/form',query:{id:$route.query.id}})"><i class="iconfont icon-bianji"></i>&nbsp;更新信息
      </div>

      <div v-if="role=='doctor'&&qflag=='true'">
        <div class="updateinfo"
             @click="$router.push({name:'/patient/form',query:{id:$route.query.id}})"><i class="iconfont icon-bianji"></i>&nbsp;更新信息
        </div>
        <mt-button @click.native="sheetVisible = true"
                   size="small"
                   type="danger"
                   style="margin-left:20px">解除隔离</mt-button>
        <mt-actionsheet :actions="actions"
                        v-model="sheetVisible"></mt-actionsheet>
      </div>

      <div v-else
           class="updatetime">报告人:{{evform.SubmitUser}}</div>
    </div>
    <div class="cardheader"></div>
    <div style="padding-left:10px;color:red"> <i class="iconfont icon-fengxian"></i>&nbsp;新冠肺炎高风险</div>
    <!-- <div>
      &nbsp; &nbsp; &nbsp; <mt-button type="primary" size="small" @click="showdetails()">查看风险详情</mt-button>
    </div> -->
    <div v-if="unrealease">
      &nbsp; &nbsp; &nbsp; <mt-button type="primary"
                 size="small">解除隔离</mt-button>
    </div>
    <div class="cardcontainer"
         id="id1">

      <div class="litext1"> <i class="iconfont icon-shugang"></i>基本信息</div>
      <div class="litext2">
        <div class="parent">
          <div class="stable">
            姓名 &nbsp; {{evform.Name}}
          </div>
          <div class="change">
            出生年月 &nbsp;{{evform.Birthday}}
          </div>
        </div>
        <div class="parent">
          <div class="stable">
            性别 &nbsp;{{evform.Gender|genderFliter}}
          </div>
          <div class="change">
            手机 &nbsp;{{evform.Phone}}
          </div>
        </div>
        <div class="parent">
          <div class="stable">
            孕妇 &nbsp;{{evform.Pregnant|pregFliter}}
          </div>
        </div>
      </div>
      <div class="litext1"> <i class="iconfont icon-shugang"></i>手写接触史
      </div>
      <div class="litext2">
        {{evform.ContactHistory}}
      </div>
      <div class="litext1"> <i class="iconfont icon-shugang"></i>既往病史</div>
      <div class="litext2">
        {{evform.MedicalHis}}
      </div>
      <div class="litext1"> <i class="iconfont icon-shugang"></i>过敏史</div>
      <div class="litext2">{{evform.AllergyHistory}}</div>
      <div class="litext1"> <i class="iconfont icon-shugang"></i>流行病学接触史</div>
      <div class="litext2"
           v-html="evform.EpidemiProb"></div>
      <div class="litext1"> <i class="iconfont icon-shugang"></i>临床表现</div>
      <div class="litext2">{{evform.SymptomProb}}</div>
      <div class="litext1"> <i class="iconfont icon-shugang"></i>生理参数</div>
      <div class="litext2">{{evform.VitalSigns}}</div>
      <div class="litext1"> <i class="iconfont icon-shugang"></i>每日体温变化</div>
      <div id="linechart"
           class="chart"></div>
    </div>
    <br><br><br>
  </div>

</template>
<script>
import axios from 'axios'
export default {

  // 怀孕0无1有2不清楚，性别1男2女
  props: ['reportId', 'qflag'],
  data() {
    return {
      unrealease: this.$route.params.realeaseFlag,
      evform: {
        SubmitDate: '',
        SubmitUser: '',
      },
      role: window.localStorage.getItem("role"),
      sheetVisible: false,
      actions: [],


    }
  },
  watch: {
    reportId: {
      immediate: true,
      handler: function (newVal, oldVal) {
        console.log(newVal)
        this.getEvaluationByID(newVal)
        // this.gettemplist(this.$route.query.id)
        // this.drawline()
      }

    }

  },
  filters: {
    genderFliter: function (val) {
      switch (Number(val)) {
        case 1:
          return '男'
        case 2:
          return '女'

        default:
          break
      }
    },
    pregFliter: function (val) {
      switch (Number(val)) {
        case 0:
          return '是'
        case 1:
          return '否'
        case 2:
          return '不清楚'
        default:
          break
      }
    }
  },
  //router.push会带params，所以没关系。过来的话会先执行mounted
  mounted() {
    this.gettemplist(this.$route.query.id)
    console.log('assr mounted 画图')
    // this.drawline()

    this.actions = [{
      name: '确定解除隔离',
      method: this.setCompeletTag
    },];
  },
  // 当引入keep-alive的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
  activated() {
    this.gettemplist(this.$route.query.id)
    console.log('assr activated 画图')
    // this.drawline()
  },

  deactivated() {
    // console.log('deactive')
  },
  methods: {
    setCompeletTag() {
      axios.post('/setCompeletTag', { "patientId": this.$route.query.id, completeTag: '1' })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    gettemplist(val) {
      // var p1 = axios.post('/getTemperMorningList', {
      //   "patientId": val
      // })
      // var p2 = axios.post('/getTemperNightList', {
      //   "patientId": val
      // })
      // Promise.all([p1, p2]).then(result => {
      //   var t1 = result[0].data.results
      //   var t2 = result[1].data.results
      // }).catch(error => {
      //   console.log("error", error.response);
      // });
      axios.post('/getTempertureList', { "patientId": val }).then(results => {
        var tlist = results.data.results
        this.drawline(tlist)
      })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    showdetails() {
      console.log('查看详情')
      // 跳转到风险详情-sj
      this.$router.push('/patient/risk')
    },
    drawline(tlist) {
      var myChart = null;
      var div_ = document.getElementById("linechart");
      div_.removeAttribute("_echarts_instance_");
      myChart = this.$echarts.init(div_);


      // let myChart = this.$echarts.init(document.getElementById('linechart'));
      myChart.clear()
      var t1 = []
      var t2 = []
      var tDate = []
      for (var i in tlist) {
        tDate.push(tlist[i].RecordDate)
        t1.push(Number(tlist[i].TemperMorning))//上午体温
        t2.push(Number(tlist[i].TemperNight))//下午体温
      }
      var option = {
        legend: {
          data: ['上午体温', '下午体温']
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var relVal = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + "℃";
            }
            return relVal;
          }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: tDate
        },
        yAxis: {
          type: 'value',
          min: function (value) {
            return value.min - 1
          },
          max: function (value) {
            return value.max + 1
          }
        },
        series: [
          {
            name: '上午体温',
            type: 'line',
            data: t1
          },
          {
            name: '下午体温',
            type: 'line',
            data: t2
          }
        ]
      };
      myChart.setOption(option, true);
    },
    getEvaluation() {
      axios.post('/getEvaluation', {
        "patientId": this.$route.query.id
      }).then(response => {
        // console.log(response.data.results[0])
        this.evform = response.data.results[0]
        this.evform.EpidemiProb = this.evform.EpidemiProb.replace(/\r\n/g, "<br>")
      })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    getEvaluationByID(val) {
      axios.post('/getEvaluationByID', {
        "evaluId": val
      }).then(response => {
        // console.log(response.data.results[0])
        this.evform = response.data.results[0]
        this.evform.EpidemiProb = this.evform.EpidemiProb.replace(/\r\n/g, "<br>")
      })
        .catch(function (error) {
          console.log('error', error)
        })

    }

  }

}
</script>
<style>
@import "../../assets/gyx/iconfont.css";
.reportcard {
  margin: 10px 10px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: left;
}
.reportheader {
  font-size: 14px;
}
.updatetime {
  display: inline;
  color: grey;
  padding-left: 20px;
}
.updateinfo {
  padding-right: 20px;
  float: right;
  color: dodgerblue;
}
.cardheader {
  margin-top: 5px;
  border-radius: 8px 8px 0px 0px;
  background: red;
  width: 100%;
  height: 10px;
}
.cardcontainer {
  padding: 10px;
  /* max-width: 300px; */
  overflow: auto;
}
/* li {
  list-style: inside url("../../assets/shugang.svg");
} */
.litext1 {
  color: #4aab44;
}
.litext2 {
  padding-left: 10px;
}
.parent {
  display: flex;
  flex-flow: row;
}
.stable {
  width: 150px;
}
.change {
  flex: 1;
}
.chart {
  width: 90%;
  height: 200px;
  margin: auto;
}
@component-namespace page {
  @component actionsheet {
    @descendent wrapper {
      padding: 0 20px;
      position: absolute 50% * * *;
      width: 100%;
      transform: translateY(-50%);

      button:first-child {
        margin-bottom: 20px;
      }
    }
  }
}
</style>