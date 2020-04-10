<template>
  <!-- 患者主页新冠自查-我的评估报告 -->
  <div class="page-tabbar">
    <div class="page-wrap">

    <mt-header title="患者详情">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>

      <mt-tab-container class="page-tabbar-container" v-model="selectedTab">
        <mt-tab-container-item id="1">
          <!-- 我的评估报告/评估记录gyx -->
          <mt-navbar v-model="selectedRecord">
            <mt-tab-item id="1"><i class="iconfont icon-myreport"></i>&nbsp;患者评估报告</mt-tab-item>
            <mt-tab-item id="2"><i class="iconfont icon-jilu"></i>&nbsp;评估记录</mt-tab-item>
          </mt-navbar>
          <mt-tab-container v-model="selectedRecord">
            <mt-tab-container-item id="1">
              <!-- 我的评估报告在这个组件里写 -->
                <assessmentReport :reportId="reportId" :qflag="qflag"></assessmentReport>

            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <!-- 评估记录在这个组件里写 -->
              <reportHistory></reportHistory>

            </mt-tab-container-item>
          </mt-tab-container>
        </mt-tab-container-item>      
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import reportHistory from '../patientcombination/reportHistory'
import assessmentReport from '../patientcombination/assessmentReport'

export default {
  components: {
    reportHistory,
    assessmentReport,

  },
  data() {
    return {
      selectedTab: '1',
      selectedRecord: '1',
      qflag: 'true',
      reportId: '',
    }
  },
  methods: {
    getEvaluation () {
      axios.post('/getEvaluation', {
        "patientId": this.$route.query.id
      }).then(response => {
        this.reportId = response.data.results[0].EvaluID
      })
        .catch(function (error) {
          console.log('error', error)
        })
    },
  },

  mounted(){
    this.getEvaluation()
  }
}
</script>

<style scoped>
@import "../../assets/gyx/iconfont.css";
</style>>
