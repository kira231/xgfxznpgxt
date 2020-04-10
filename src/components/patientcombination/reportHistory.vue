<template>
  <div>

    <!-- <div style="text-align:left;overflow:hidden">
      <mt-cell title="提交人" style="width:70%;float:left" @click.native="popupVisible=true">
        <span>{{currentTags?currentTags.name: '请选择'}}</span>
      </mt-cell>
      <div class="jilu"> <span>共5条记录</span></div>
    </div> -->

    <div class="rhsection">
      <div class="rhsection_title">
        <span class="rhtext">每日上报列表</span>
      </div>
      <div v-for="item in dailylist" :key="item.RecordDate">
        <div class="rhcard2">
          <div class="leftside2"></div>
          <div style="float:left;padding-left:20px;">
            日期：{{item.RecordDate}}<br>
            早晚温度：{{item.TemperMorning+'/'+item.TemperNight}}℃ <br>
            临床症状:{{item.clinalp}}
          </div>
        </div>
      </div>

    </div>
    <div class="rhsection">

      <div class="rhsection_title">
        <span class="rhtext">评估报告列表</span></div>
      <div v-for="item in evlist" :key="item.EvaluID" @click="gotoPatEvaluation(item.EvaluID)">
        <div class="rhcard">
          <!-- {{item.MachineRes|riskcolorfilter}} -->
          <div class="leftside" v-bind:style="{'background':item.color}"></div>
          <div class="iconside" v-bind:style="{'color':item.color}"> <i class="iconfont icon-fengxian"
              style="font-size:30px;"></i></div>
          <div class="rightside">
            <span>提交人：</span><span>{{item.SubmitUser}}</span><br>
            <span>更新时间：{{item.SubmitDate}}</span>
          </div>

          <div class="righticon">
            <i class="iconfont icon-youjian" style="font-size:20px;"></i>

          </div>
        </div>
      </div>
    </div>
    <br><br>
    <!-- <mt-popup v-model="popupVisible" position="bottom" class="mint-popup" style="width:100%;height:30%">
      <mt-picker :slots="dataList" :show-toolbar="true" ref="picker" value-key="name">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="">提交人</div>
          <div class="usi-btn-sure" @click="PickerSubBtn">确定</div>
        </div>
      </mt-picker>
    </mt-popup> -->

  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      popupVisible: false,
      currentTags: '',

      dataList: [
        {
          values: [
            {
              name: "张三",
              id: 123,
            },
            {
              name: "赵英浩",
              id: 1333,
            }
            , {
              name: "李四",
              id: 1455,
            }
          ]
        }
      ],
      currentTags: '',
      // reportlist: [
      //   {
      //     name: "张三",
      //     reportid: '123',
      //     risk: 'H',
      //     updatetime: "2020年3月22日21：30"
      //   },
      //   {
      //     name: "张三",
      //     reportid: '1453',
      //     risk: 'H',
      //     updatetime: "2020年3月22日18：30"
      //   },
      //   {
      //     name: "张三",
      //     reportid: '4553',
      //     risk: 'H',
      //     updatetime: "2020年3月22日17：30"
      //   }
      // ],
      dailyreportlist: [
        {
          date: "2020-03-31",
          amtemp: "36.7",
          pmtemp: "36.7",
          // clinicalSymbols: ['1', '2', '3'],
          clinalp: '流泪',
        },
        {
          date: "2020-03-30",
          amtemp: "36.7",
          pmtemp: "36.7",
          // clinicalSymbols: ['1', '2', '3'],
          clinalp: '流泪',
        },
        {
          date: "2020-03-29",
          amtemp: "36.7",
          pmtemp: "36.7",
          // clinicalSymbols: ['1', '2', '3'],
          clinalp: '流泪',


        }
      ],
      evlist: [],
      dailylist: [],

    }
  },


  mounted () {
    console.log('评估记录页面mounted')
    this.getEvaluationList()
    this.getTempertureList()
  },
  activated () {
    //keep-alive 进来先加载这个
    console.log('评估记录页面actived')
    this.getEvaluationList()
    this.getTempertureList()
  },


  methods: {
    backPopuphandleConfim () {

    },
    PickerSubBtn () {
      // console.log(this.$refs.picker.getValues()[0])
      this.currentTags = this.$refs.picker.getValues()[0]
      this.popupVisible = false

    },
    gotoPatEvaluation (val) {

      this.$router.push({
        name: '/patient/evaluation',
        // params: {
        //   evaluId: val
        // },
        query: {
          id: this.$route.query.id,
          evaluId: val
        }
      })
    },
    getEvaluationList () {

      axios.post('/getEvaluationList', {
        "patientId": this.$route.query.id
      }).then(response => {
        // console.log(response.data.results[0])
        this.evlist = []
        const colorlist = new Map([[0, 'green'], [1, 'green'], [2, 'blue'], [3, 'red']])
        const textlist = new Map([[0, '暂无风险'], [1, '低风险'], [2, '中风险'], [3, '高风险']])
        var dd = response.data.results
        this.evlist = dd.map(item => {
          return {
            SubmitDate: item.SubmitDate,
            color: colorlist.get(parseInt(item.MachineRes)),
            text: textlist.get(parseInt(item.MachineRes)),
            SubmitUser: item.SubmitUser,
            EvaluID: parseInt(item.EvaluID),
          }
        })

      })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    getTempertureList () {
      axios.post('/getTempertureList', {
        "patientId": this.$route.query.id
      }).then(response => {
        // console.log(response.data.results[0])
        const coughlist = new Map([[1, ' 咳嗽 '], [0, ''], [2, ''], [3, '']])
        const gasplist = new Map([[1, ' 流涕 '], [0, ''], [2, ''], [3, '']])
        var dd = response.data.results
        this.dailylist = []
        this.dailylist = dd.map(item => {
          return {
            RecordDate: item.RecordDate,
            TemperMorning: item.TemperMorning,
            TemperNight: item.TemperNight,
            clinalp: coughlist.get(parseInt(item.Cough)) + gasplist.get(parseInt(item.Gasp)) + item.Other
          }
        })
      })
        .catch(function (error) {
          console.log('error', error)
        })

    }
  }

}
</script>
<style scoped>
.tt1 {
  display: inline;
  background-color: coral;
}
.jilu {
  float: right;
  height: 48px;
  line-height: 48px;
  padding-right: 20px;
}
.picker-toolbar-title {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.usi-btn-cancel,
.usi-btn-sure {
  color: #ff6600;
}
.rhcard {
  text-align: left;
  margin: 10px;
  width: 100%;
  height: 60px;
  overflow: hidden;
}
.rhcard2 {
  text-align: left;
  margin: 10px;
  width: 100%;
  height: 80px;
  overflow: hidden;
}
.rhcard2 .leftside2 {
  width: 8px;
  float: left;
  height: 80px;

  /* height: 30px; */
  border-radius: 8px 0px 0px 8px;
  background: #ff6600;
}
.rhcard .leftside {
  width: 8px;
  float: left;
  height: 60px;

  /* height: 30px; */
  border-radius: 8px 0px 0px 8px;
  background: red;
}
.rhcard .iconside {
  padding: 0px 10px;
  float: left;
  height: 60px;
  line-height: 60px;
  /* color: red; */
}
.rhcard .rightside {
  float: left;
  padding: 5px;
}
.rhcard .righticon {
  float: right;
  height: 60px;
  line-height: 60px;
  padding-right: 20px;
}
.rhsection_title {
  border-left: 0.2em solid rgb(242, 156, 57);
  /* padding-left: 0.2em; */
  line-height: 1;
  font-size: 1.2rem;
  margin-left: 20px;
  text-align: left;
}
.rhtext {
  padding-left: 10px;
}
.rhsection {
  margin: 20px;
  /* border: 1px solid white;
  background: white; */
}
</style>