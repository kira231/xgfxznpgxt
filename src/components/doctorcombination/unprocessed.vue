<template>
  <div>
    <!-- 
    <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
            <select v-model="way" style="height:30px">
                <option v-for="x in searchway" :key="x.wayid">{{x.wayname}}</option>
            </select>
        </div>
        <div class="weui-cell__bd">
            <mt-field  v-model="content" placeholder="请输入"></mt-field> 
        </div>
        <div class="weui-cell__ft" style="margin:10px">
            <mt-button size="small" type="primary" @click="search(way,content)">搜&nbsp;索</mt-button>
        </div>
    </div> -->

    <div v-for="item in unprocessedlist" :key="item.unprocessedid">
      <a href="javascript:void(0);" @click="todetail(item.patientid)" style="color:black">
        <div class="cardlist">
          <div v-if="item.risk == '3'">
            <div class="leftside" style="background:red"></div>
            <div class="iconside" style="color:red"> <i class="iconfont icon-fengxian" style="font-size:30px"></i></div>
            <div class="rightside">
              <span>{{item.name+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.gender+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.age+'岁'+"&nbsp;&nbsp;&nbsp;&nbsp;"+'风险：高'}}</span><br>
              <span>更新时间：{{item.updatetime}}</span>
            </div>
          </div>
          <div v-if="item.risk == '2'">
            <div class="leftside" style="background:blue"></div>
            <div class="iconside" style="color:blue"> <i class="iconfont icon-fengxian" style="font-size:30px;"></i>
            </div>
            <div class="rightside">
              <span>{{item.name+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.gender+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.age+'岁'+"&nbsp;&nbsp;&nbsp;&nbsp;"+'风险：中'}}</span><br>
              <span>更新时间：{{item.updatetime}}</span>
            </div>
          </div>
          <div v-if="item.risk == '1'">
            <div class="leftside" style="background:green"></div>
            <div class="iconside" style="color:green"> <i class="iconfont icon-fengxian" style="font-size:30px;"></i>
            </div>
            <div class="rightside">
              <span>{{item.name+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.gender+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.age+'岁'+"&nbsp;&nbsp;&nbsp;&nbsp;"+'风险：低'}}</span><br>
              <span>更新时间：{{item.updatetime}}</span>
            </div>
          </div>
          <div v-if="item.risk == '0'">
            <div class="leftside" style="background:green"></div>
            <div class="iconside" style="color:green"> <i class="iconfont icon-fengxian" style="font-size:30px;"></i>
            </div>
            <div class="rightside">
              <span>{{item.name+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.gender+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.age+'岁'+"&nbsp;&nbsp;&nbsp;&nbsp;"+'风险：暂无风险'}}</span><br>
              <span>更新时间：{{item.updatetime}}</span>
            </div>
          </div>         
          <div class="righticon">
            <i class="iconfont icon-youjian" style="font-size:20px;"></i>
          </div>
        </div>
      </a>
    </div>
    <br /> <br /> <br />
  </div>

</template>

<script>
import axios from "axios";
export default {
  data () {
    return {
      // searchway:[
      //     {wayid:"01",wayname:"按姓名搜索"},
      //     {wayid:"02",wayname:"按手机号搜索"},
      // ],
      // way:'',
      // content:'',
      unprocessedlist: [],
    }
  },

  activated () {
    this.getReservListUndergoing()
  },


  methods: {
    getReservListUndergoing () {
      axios.post('/getReservListUndergoing', {"doctorId": window.localStorage.getItem("doctorId")})
        .then(response => {
          const genderlist = new Map([[1,'男'],[2,'女']])
          var dd = response.data.results
          this.unprocessedlist=dd.map(item =>{
            return{
              unprocessedid:item.ReservID,
              patientid:item.PatientID,
              name:item.Name,
              gender:genderlist.get(parseInt(item.Gender)),
              age:item.Age,
              phone:item.Phone,
              updatetime:item.SubmitDate,
              risk:item.MachineRes,
            }
          })
        })
        .catch(function (error) {
          console.log('error', error)
        })
    },

    todetail (patientid) {     
      this.$router.push({ name: "/doctor/patdetailmod", query: {id:patientid} })
    },
  },
}
</script>

<style>
.cardlist {
  text-align: left;
  margin: 10px;
  width: 100%;
  height: 60px;
  overflow: hidden;
}
.cardlist .leftside {
  width: 8px;
  float: left;
  height: 60px;

  /* height: 30px; */
  border-radius: 8px 0px 0px 8px;
}
.cardlist .iconside {
  padding: 0px 10px;
  float: left;
  height: 60px;
  line-height: 60px;
}
.cardlist .rightside {
  float: left;
  padding: 5px;
}
.cardlist .righticon {
  float: right;
  height: 60px;
  line-height: 60px;
  padding-right: 20px;
}
</style>