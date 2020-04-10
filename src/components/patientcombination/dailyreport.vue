<template>
  <div>
    <mt-header title="每日上报" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click.native="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="drcontainer">
      <div class="drcard">

        今日日期：
        <mt-button @click.native="open('picker')">{{dataVal | formatDate}}</mt-button> <br>
        <mt-datetime-picker v-model="dataVal" type="date" ref="picker" :endDate="endDate" year-format="{value} 年"
          month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm">
        </mt-datetime-picker>
        今日体温：<br>
        <input type="radio" value="AM" v-model="selectedtype">上午
        <input v-show="selectedtype=='AM'" class="input1" v-model="amtemp" placeholder="请填写上午体温" />
        <span v-show="selectedtype=='AM'">℃</span>

        <br>
        <input type="radio" value="PM" v-model="selectedtype">下午
        <input v-show="selectedtype=='PM'" class="input1" v-model="pmtemp" placeholder="请填写下午体温" />
        <span v-show="selectedtype=='PM'">℃</span>
        <br>
        临床症状:
        <br>
        <div> <input type="checkbox" value="0" v-model="clinicalSymptoms">咳嗽</div>
        <div> <input type="checkbox" value="1" v-model="clinicalSymptoms">气促</div>
        <div> <input type="checkbox" value="2" v-model="clinicalSymptoms">其他

          <input class="input1" v-model="other" placeholder="请填写其他症状" /></div>
      </div>
      <mt-button @click="submittemp()">确认提交</mt-button>

    </div>

  </div>
</template>
<script>
import axios from 'axios'
import { picker } from 'mint-ui';
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
import { formatDate } from '../../../static/js/datedd.js'
export default {
  data () {
    return {
      selectedtype: 'AM',
      amtemp: '',
      pmtemp: '',
      clinicalSymptoms: [],
      describe: '',
      dataVal: new Date(),
      endDate: new Date(),
      datepickerVisiable: false,
      other: '',

    }
  },
  filters: {                    //时间转换
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  methods: {
    handleConfirm () {
      // console.log(this.dataVal)
      var date = formatDate(this.dataVal, 'yyyy-MM-dd')
      this.datepickerVisiable = true


    },
    open (picker) {
      this.$refs[picker].open();
      this.dataVal = new Date()   //设置开始
    },
    submittemp () {
      var coughtag = ''
      var gasptag = ''
      if (this.clinicalSymptoms.includes("0")) {
        coughtag = 1
      }
      else {
        coughtag = 2
      }
      if (this.clinicalSymptoms.includes("1")) {
        gasptag = 1
      }
      else {
        gasptag = 2
      }
      var flag1 = true
      if (this.selectedtype == 'AM') {
        if (this.amtemp == '') {

          MessageBox.alert('请填写上午体温')
          flag1 = false
        }
      }
      else {
        if (this.pmtemp == '') {

          MessageBox.alert('请填写下午体温')
          flag1 = false
        }
      }
      var flag2 = true
      if (this.clinicalSymptoms.includes("2")) {
        if (this.other == '') {

          MessageBox.alert('请填写其他症状')
          flag2 = false
        }
      }
      var flag3 = flag1 && flag2
      console.log(flag3, 'flag3')
      if (flag3) {
        if (this.selectedtype == 'AM') {

          axios.post('/newTemperatureMorning', {
            "patientId": this.$route.query.id,
            "recordDate": formatDate(this.dataVal, 'yyyy-MM-dd'),
            "temper": this.amtemp,
            "cough": coughtag,
            "gasp": gasptag,
            "other": this.other

          }).then(response => {
            console.log(response.data)

          }).catch(function (error) {
            console.log('error', error)
          })


        }
        else {
          axios.post('/newTemperatureNight', {
            "patientId": this.$route.query.id,
            "recordDate": formatDate(this.dataVal, 'yyyy-MM-dd'),
            "temper": this.pmtemp,
            "cough": coughtag,
            "gasp": gasptag,
            "other": this.other

          }).then(response => {
            // console.log(response.data)
            MessageBox.alert('上报成功').then(action => {
              this.$router.back(-1)
            })

          }).catch(function (error) {
            console.log('error', error)
          })

        }

      }





    },
    checkinput () {


    }
  }

}
</script>
<style>
.drcontainer {
  /* background: #f5f5f9; */
  margin-top: 60px;
}
.drcard {
  margin: 20px;
  /* padding: 10px;
  border: 1px solid white;
  background: white;
  border-radius: 5px; */
  text-align: left;
}
input[type="checkbox"] {
  margin-right: 10px;
  line-height: 12px;

  cursor: pointer;
  font-size: 14px;
  width: 12px;
  height: 12px;
  position: relative;
}
input[type="checkbox"]:after {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 0;
  content: " ";
  color: #fff;
  display: inline-block;
  visibility: visible;
  padding: 0px;
  border-radius: 3px;
  background: #ffffff;
  border: 1px solid #dddddd;
}
input[type="radio"] {
  margin-right: 10px;
  line-height: 12px;
  cursor: pointer;
  font-size: 12px;
  width: 12px;
  height: 12px;
  position: relative;
}
input[type="radio"]:after {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 0;
  content: " ";
  color: #fff;
  display: inline-block;
  visibility: visible;
  padding: 0px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #36aeff;
}
input[type="radio"]:checked:after {
  content: "";
  font-size: 12px;

  font-weight: 600;
  background-color: #36aeff;
}
.input1 {
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  height: 1.41176471em;
  line-height: 1.41176471;
}
input[type="checkbox"]:checked:after {
  content: "✓";
  font-size: 14px;
  font-weight: 600;
  background-color: #36aeff;
}
</style>