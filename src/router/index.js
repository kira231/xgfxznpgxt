import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import doctor from '@/components/doctor'
import patient from '@/components/patient'
import Split from '@/components/Split'
import Train from '@/components/Train'
import PatForgetpwd from '@/components/PatForgetpwd'
import PatRegister from '@/components/PatRegister'
import DrForgetpwd from '@/components/DrForgetpwd'
import DrRegister from '@/components/DrRegister'
import Statistics from '@/components/Statistics'
import DrHome from '@/components/doctorcombination/DrHome'

import PatInfo from '@/components/patientfolder/PatInfo'
import PatEvaluation from '@/components/patientfolder/PatEvaluation'
import PatapptDetail from '@/components/patientfolder/apptDetail'
import PatRiskDetail from '@/components/patientfolder/PatRiskdetail'

import PatMainpage from '@/components/patientcombination/pmainpage'
import dailyreport from '@/components/patientcombination/dailyreport'


// import Patdetail from '@/components/patientfolder/patientDetail'
import Patdetailmod from '@/components/patientfolder/patDetailmodife'
import Patdetailunmod from '@/components/patientfolder/patDetailunmodife'

//吴改后删掉包括下面的路径
import PatdoctorList from '@/components/patientfolder/doctorList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/doctor',
      name: 'doctor',
      component: doctor,
    }, {
      path: '/Split',
      name: 'Split',
      component: Split
    }, {
      path: '/Train',
      name: 'Train',
      component: Train
    }, {
      path: '/PatForgetpwd',
      name: 'PatForgetpwd',
      component: PatForgetpwd
    }, {
      path: '/PatRegister',
      name: 'PatRegister',
      component: PatRegister
    }, {
      path: '/DrForgetpwd',
      name: 'DrForgetpwd',
      component: DrForgetpwd
    }, {
      path: '/DrRegister',
      name: 'DrRegister',
      component: DrRegister
    }, {
      path: '/Statistics',
      name: 'Statistics',
      component: Statistics
    }, {
      path: '/doctor/home',
      name: '/doctor/home',
      component: DrHome,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }, {
      path: '/patient',
      name: 'patient',
      component: patient
    }, {
      path: '/patient/main',
      name: '/patient/main',
      component: PatMainpage,
      meta: {
        keepAlive: true,// 需要被缓存

      }
    }, {
      path: '/patient/risk',
      name: '/patient/risk',
      component: PatRiskDetail
    }, {
      path: '/patient/form',
      name: '/patient/form',
      component: PatInfo
    }, {
      path: '/patient/evaluation',
      name: '/patient/evaluation',
      component: PatEvaluation
    }, {
      path: '/patient/appt',
      name: '/patient/appt',
      component: PatdoctorList
    }, {
      path: '/appt_detail',
      name: '/appt_detail',
      component: PatapptDetail
    }, {
      path: '/patient/dailyreport',
      name: '/patient/dailyreport',
      component: dailyreport
    },
    {
      path: '/doctor/patdetailunmod',
      name: '/doctor/patdetailunmod',
      component: Patdetailunmod,//医生端
    }, {
      path: '/doctor/patdetailmod',
      name: '/doctor/patdetailmod',
      component: Patdetailmod,
    }

  ]
})