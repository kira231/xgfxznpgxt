<template>
  <div>
    <mt-header title="填写自查信息" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click.native="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <nav style="position:fixed;top:40px;width:100%;z-index:10">
      <a class="nav1" v-for="(item, index) in navList" :key="index" @click="jump(index)"
        :style="{color: activeStep === index ? '#1987e1' : '#000000'}">{{item}}</a>
    </nav>
    <div class="wrapper">
      <div class="section">
        <div class="section_title">基本信息</div>
        <div class="card">
          <div id="name">
            <span class="text1">姓名</span>
            <input class="input1" v-model="form.name" placeholder="请填写姓名" />
          </div>
          <div id="gender">
            <span class="text1">性别</span>
            <input type="radio" value="1" v-model="form.gender">男
            <input type="radio" value="2" v-model="form.gender">女
          </div>
          <div id="age">
            <span class="text1">年龄</span>
            <input class="input1" v-model="form.age" placeholder="请填写年龄" />
          </div>

          <!-- <div id="birthday">
            <span class="text1">出生年月</span>
            <input class="input1" v-model="form.birthday" placeholder="请填写出生年月" />
          </div> -->
          <div id="phone">
            <span class="text1">联系方式</span>
            <input class="input1" type="number" pattern="[0-9]*" v-model="form.phone" placeholder="请填写手机号" />
          </div>
          <div v-show="form.gender==2" id="pregnant">
            <span class="text1">是否为孕妇</span>
            <input type="radio" value="0" v-model="form.pregnant">否
            <input type="radio" value="1" v-model="form.pregnant">是
            <input type="radio" value="2" v-model="form.pregnant">不清楚
          </div>
          <!-- <div id="occupation">
            <span class="text2">职业</span>
            <input class="input1" v-model="form.occupation" placeholder="请填写职业" />
          </div>
          <div id="addresss">
            <span class="text2">家庭住址</span>
            <input class="input1" v-model="form.address" placeholder="请填写家庭住址" />
          </div>
          <div id="IDcard">
            <span class="text2">身份证号</span>
            <input class="input1" v-model="form.IDcard" placeholder="请填写身份证号" />
          </div>
          <div id="checkInRoom">
            <span class="text2">入住房间</span>
            <input class="input1" v-model="form.checkInRoom" placeholder="请填写入住房间" />
          </div>
          <div id="checkInTime">
            <span class="text2">入住时间</span>
            <input class="input1" v-model="form.checkInTime" placeholder="请填写入住时间(yyyy-mm-dd)" />
          </div>
          <div id="leaveTime">
            <span class="text2">解除时间</span>
            <input class="input1" v-model="form.leaveTime" placeholder="请填写接触观察时间" />
          </div>
          <div id="lastContactTime">
            <span class="text2">末次接触时间</span>
            <input class="input1" v-model="form.lastContactTime" placeholder="请填写末次接触时间" />
          </div>

          <div id="contactHistory">
            <span class="text2">简要接触史</span>
            <input class="input1" v-model="form.contactHistory" placeholder="请填写简要接触史" />
          </div> -->

        </div>
      </div>
      <div class="section">
        <div class="section_title">健康问卷</div>
        <div class="card">
          <div class="sectionLine">流行病学调查</div>
          <div id="q1">
            <div class="text1">Q1：最近14天（两周内），是否有在以下新冠肺炎高发地区停留或旅游的经历？</div>
            <div> <input type="checkbox" :value="options1[0].value" v-model="form.question1">
              {{options1[0].label}}</div>
            <div> <input type="checkbox" :value="options1[1].value" v-model="form.question1">{{options1[1].label}}
            </div>
            <div> <input type="checkbox" :value="options1[2].value" v-model="form.question1">{{options1[2].label}}
            </div>
            <div v-show="form.question1.includes(3)">
              <input class="input1" placeholder="请填写" v-model="form.q1_3_p" />
            </div>
            <div> <input type="checkbox" :value="options1[3].value" v-model="form.question1">{{options1[3].label}}
            </div>
          </div>
          <div id="q2">
            <div class="text1">Q2：最近14天（两周内），所居住的社区是否报告过确诊的新冠肺炎的情况？</div>
            <input type="radio" :value="options2[0].value" v-model="form.question2">{{options2[0].label}}
            <input type="radio" :value="options2[1].value" v-model="form.question2">{{options2[1].label}}

          </div>
          <div id="q3">
            <div class="text1">Q3：最近14天（两周内），是否接触过已确诊新冠肺炎（核酸检测阳性）的患者？</div>
            <input type="radio" :value="options3[0].value" v-model="form.question3">{{options3[0].label}}
            <input type="radio" :value="options3[1].value" v-model="form.question3">{{options3[1].label}}
          </div>
          <div id="q4">
            <div class="text1">Q4：最近14天（两周内），是否接触过来自新冠肺炎高发地区，发热或有呼吸道症状的人员？</div>
            <input type="radio" :value="options4[0].value" v-model="form.question4">{{options4[0].label}}
            <input type="radio" :value="options4[1].value" v-model="form.question4">{{options4[1].label}}
          </div>
          <div id="q5">
            <div class="text1">Q5：最近14天（两周内），是否您的家庭、办公室、学校班级等人员密集场所，出现2例及以上发热、或呼吸道症状的情况？</div>
            <input type="radio" :value="options5[0].value" v-model="form.question5">{{options5[0].label}}
            <input type="radio" :value="options5[1].value" v-model="form.question5">{{options5[1].label}}
          </div>
          <div class="sectionLine">症状问询</div>
          <div id="q6">
            <div class="text1">Q6：最近14天（两周内），您是否还有以下及其他旅行、接触情况？</div>
            <div> <input type="checkbox" :value="options6[0].value" v-model="form.question6">
              {{options6[0].label}}</div>
            <div> <input type="checkbox" :value="options6[1].value" v-model="form.question6">{{options6[1].label}}
            </div>
            <div> <input type="checkbox" :value="options6[2].value" v-model="form.question6">{{options6[2].label}}
            </div>
            <div> <input type="checkbox" :value="options6[3].value" v-model="form.question6">{{options6[3].label}}
            </div>
            <div v-show="form.question6.includes(4)">
              <input class="input1" placeholder="请填写" v-model="form.q6_4_p" />
            </div>
            <div> <input type="checkbox" :value="options6[4].value" v-model="form.question6">{{options6[4].label}}
            </div>
          </div>
          <div id="q7">
            <div class="text1">Q7：最近14天（两周内），您是否出现过发热（体温高于37.3℃/99.1℉）的情况？</div>
            <div>
              <input type="radio" :value="options7[0].value" v-model="form.question7">{{options7[0].label}}
              <div style="float:right" @click="q7popupVisible=true">{{q7currentTags?q7currentTags.label: '请选择测量部位'}}
              </div>
            </div>
            <div v-show="form.question7==1">
              <input class="input1" placeholder="请输入最高体温" v-model="form.q7_1_p" />℃
            </div>
            <input type="radio" :value="options7[1].value" v-model="form.question7">{{options7[1].label}}
          </div>

          <div id="q8">
            <div class="text1">Q8：最近14天（两周内），您是否出现以下呼吸道不适的情况？</div>
            <div>
              <input type="checkbox" :value="options8[0].value" v-model="form.question8">
              {{options8[0].label}}
              <input type="checkbox" :value="options8[1].value" v-model="form.question8">
              {{options8[1].label}}
              <input type="checkbox" :value="options8[2].value" v-model="form.question8">
              {{options8[2].label}}
              <input type="checkbox" :value="options8[3].value" v-model="form.question8">
              {{options8[3].label}}
              <input type="checkbox" :value="options8[4].value" v-model="form.question8">
              {{options8[4].label}}
              <input type="checkbox" :value="options8[5].value" v-model="form.question8">
              {{options8[5].label}}
              <input type="checkbox" :value="options8[6].value" v-model="form.question8">
              {{options8[6].label}}
              <input type="checkbox" :value="options8[7].value" v-model="form.question8">
              {{options8[7].label}}
              <br>
              <div>
                <input type="checkbox" :value="options8[8].value" v-model="form.question8"> {{options8[8].label}}
                <span style="float:right"
                  @click="q8popupVisible1=true">{{q8currentTags1?q8currentTags1.label: '请选择'}}</span>
              </div>
              <div>
                <input type="checkbox" :value="options8[9].value" v-model="form.question8">{{options8[9].label}}
                <span style="float:right"
                  @click="q8popupVisible2=true">{{q8currentTags2?q8currentTags2.label: '请选择'}}</span>
              </div>
              <input type="checkbox" :value="options8[10].value" v-model="form.question8">{{options8[10].label}}<br>
              <div v-show="form.question8.includes(11)">
                <input class="input1" placeholder="请输入" v-model="form.q8_11_p" />
              </div>
              <input type="checkbox" :value="options8[11].value" v-model="form.question8">{{options8[11].label}}
            </div>
          </div>

          <div id="q9">
            <div class="text1">Q9：最近14天（两周内），您是否出现以下全身不适的情况？</div>
            <div v-for="(item,index) in options9" :key="index" class="qblock" v-if="index<16">
              <input type="checkbox" :value="item.value" v-model="form.question9">{{item.label}}

            </div>
            <br>
            <input type="checkbox" :value="options9[16].value" v-model="form.question9">{{options9[16].label}}<br>
            <div v-show="form.question9.includes(17)">
              <input class="input1" placeholder="请输入" v-model="form.q9_17_p" />
            </div>

            <input type="checkbox" :value="options9[17].value" v-model="form.question9">{{options9[17].label}}<br>
            <!-- <div v-show="form.question9.includes(18)">
              <input class="input1" placeholder="请输入" v-model="form.q9_18_p" />
            </div> -->

          </div>
          <div id="q10">
            <div class="text1">Q10：您是否有食物或药物过敏？</div>
            <!-- <div v-for="(item,index) in options10" :key="index" v-if="index<3">
              <input type="checkbox" :value="item.value" v-model="form.question10">{{item.label}}
              <div v-show="form.question10.includes(item.value)">
                <input class="input1" placeholder="请输入" />
              </div>
            </div> -->
            <input type="checkbox" :value="options10[0].value" v-model="form.question10">{{options10[0].label}}<br>
            <div v-show="form.question10.includes(1)">
              <input class="input1" placeholder="请输入" v-model="form.q10_1_p" />
            </div>
            <input type="checkbox" :value="options10[1].value" v-model="form.question10">{{options10[1].label}}<br>
            <div v-show="form.question10.includes(2)">
              <input class="input1" placeholder="请输入" v-model="form.q10_2_p" />
            </div>
            <input type="checkbox" :value="options10[2].value" v-model="form.question10">{{options10[2].label}}<br>
            <div v-show="form.question10.includes(3)">
              <input class="input1" placeholder="请输入" v-model="form.q10_3_p" />
            </div>

            <input type="checkbox" :value="options10[3].value" v-model="form.question10">{{options10[3].label}}<br>

          </div>
          <div id="q11">
            <div class="text1">Q11：您是否还存在其他基础疾病？</div>
            <div v-for="(item,index) in options11" :key="index" v-if="index<options11.length-2" class="qblock">
              <input type="checkbox" :value="item.value" v-model="form.question11">{{item.label}}

            </div>
            <input type="checkbox" :value="options11[options11.length-2].value" v-model="form.question11">
            {{options11[options11.length-2].label}}<br>
            <div v-show="form.question11.includes(12)">
              <input class="input1" placeholder="请输入" v-model="form.q11_12_p" />
            </div>
            <input type="checkbox" :value="options11[options11.length-1].value" v-model="form.question11">
            {{options11[options11.length-1].label}}<br>

          </div>
          <div id="q12">
            <div class="text2">Q12：请录入您当前的、或最近一次的生命体征测量结果：</div>
            <div class="qblock">
              <input type="checkbox" value="1" v-model="form.question12">心率（脉搏）
              <input class="input1" placeholder="请输入" v-model="form.q12_1_p" /> 次/分
            </div>
            <div>
              <input type="checkbox" value="2" v-model="form.question12">血压
              <input class="input1" placeholder="请输入" v-model="form.q12_2_p" /> mmHg
            </div>
            <div>
              <input type="checkbox" value="3" v-model="form.question12">呼吸频率
              <input class="input1" placeholder="请输入" v-model="form.q12_3_p" /> 次/分
            </div>
            <div>
              <input type="checkbox" value="4" v-model="form.question12">血氧饱和度
              <input class="input1" placeholder="请输入" v-model="form.q12_4_p" /> %
            </div>
          </div>

        </div>
      </div>
      <!-- <div class="section">
        <div class="section_title">检验检查</div>
        <div class="card">
         
        </div>
      </div> -->
      <mt-button @click="submitform()">确认提交</mt-button>
    </div>

    <mt-popup v-model="q7popupVisible" position="bottom" class="mint-popup" style="width:100%;height:50%">
      <mt-picker :slots="q7positions" :show-toolbar="true" ref="Q7picker" value-key="label">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="q7popupVisible = !q7popupVisible">取消</div>
          <div class="usi-btn-sure" @click="q7submit">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <mt-popup v-model="q8popupVisible1" position="bottom" class="mint-popup" style="width:100%;height:50%">
      <mt-picker :slots="q8positions1" :show-toolbar="true" ref="Q8picker1" value-key="label">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="q8popupVisible1 = !q8popupVisible1">取消</div>
          <div class="usi-btn-sure" @click="q8submit1">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <mt-popup v-model="q8popupVisible2" position="bottom" class="mint-popup" style="width:100%;height:50%">
      <mt-picker :slots="q8positions2" :show-toolbar="true" ref="Q8picker2" value-key="label">
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="q8popupVisible2 = !q8popupVisible2">取消</div>
          <div class="usi-btn-sure" @click="q8submit2">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { MessageBox } from 'mint-ui';
import axios from "axios";
export default {
  data () {
    return {
      activeStep: 0,
      scroll: '',
      list: [{
        name: "第一条",
        backgroundcolor: "#90B2A3"
      }, {
        name: "第二条",
        backgroundcolor: "#A593B2"
      }, {
        name: "第三条",
        backgroundcolor: "#A7B293"
      }],

      navList: ['基本信息', '健康问卷'],

      form: {
        name: '',
        gender: 1,
        age: '',
        phone: '',
        birthday: '',
        address: '',
        IDcard: '',
        submitUser: '',
        pregnant: 2,
        checkInRoom: '',
        checkInTime: '',
        leaveTime: '',
        lastContactTime: '',
        occupation: '',
        contactHistory: '',
        question1: [],
        question2: 2,
        question3: 2,
        question4: 2,
        question5: 2,
        question6: [],
        question7: 2,
        question8: [],
        question9: [],
        question10: [],
        question11: [],
        question12: [],
      },
      options1: [
        {
          label: '当前美国境内的新冠肺炎高发地区，包括：纽约州、华盛顿州、加利福尼亚州、新泽西州、伊利诺伊州、乔治亚州、佛罗里达州、路易斯安那州、密歇根州、马萨诸塞州、科罗拉多州、宾夕法尼亚州等。',
          value: 1,        },
        {
          label: '当前美国境外的新冠肺炎高发地区，包括： 西太平洋地区：中国、韩国， 欧洲地区：意大利、西班牙、德国、法国、瑞士、英国、荷兰、奥地利， 中东地区：伊朗。',
          value: 2,        },
        {
          label: '除了上述罗列的、您最近曾旅行或停留过的其他地区',
          value: 3        },
        {
          label: '以上都无',
          value: 4        }

      ],
      options2: [{
        label: '是',
        value: 1
      }, {
        label: '否',
        value: 2      }
      ],
      options3: [
        {
          label: '是',
          value: 1        },
        {
          label: '否',
          value: 2        }
      ],
      options4: [
        {
          label: '是',
          value: 1        },
        {
          label: '否',
          value: 2        }
      ],
      options5: [
        {
          label: '是',
          value: 1        },
        {
          label: '否',
          value: 2        }
      ],
      options6: [
        {
          label: '接触过鸡鸭、鸟类等禽类以及禽类动物的粪便、笼子等物品',
          value: 1        },
        {
          label: '曾去过非洲，或在非洲转机、停留',
          value: 2        },
        {
          label: '曾接触过禽流感、埃博拉、SARS等确认或疑似感染者',
          value: 3        },
        {
          label: '其他补充说明',
          value: 4        },
        {
          label: '以上都无',
          value: 5        }
      ],
      options7: [
        {
          label: '是',
          value: 1        },
        {
          label: '否',
          value: 2        }
      ],
      q7currentTags: '',
      q7popupVisible: false,
      q7positions: [{
        values: [
          {
            label: '腋下',
            value: 1          },
          {
            label: '额头',
            value: 2          },
          {
            label: '耳朵(鼓膜)',
            value: 3          },
          {
            label: '口腔',
            value: 4          },
          {
            label: '肛门',
            value: 5          }
        ]
      }
      ],
      options8: [
        { label: '咳嗽', value: 1 },
        { label: '鼻塞', value: 2 },
        { label: '咽喉肿痛', value: 3 },
        { label: '呼吸急促', value: 4 },
        { label: '喷嚏', value: 5 },
        { label: '胸闷', value: 6 },
        { label: '呼吸困难', value: 7 },
        { label: '咯血', value: 8 },
        { label: '咳痰', value: 9 },
        { label: '流涕', value: 10 },
        { label: '其他', value: 11 },
        { label: '以上都无', value: 12 }
      ],
      q8currentTags1: '',
      q8popupVisible1: false,
      q8positions1: [{
        values: [
          { label: '普通白色痰', value: 1 },
          { label: '痰中有脓液', value: 2 },
          { label: '痰中有血', value: 3 },
        ]
      }],
      q8currentTags2: '',
      q8popupVisible2: false,
      q8positions2: [{
        values: [
          { label: '普通清水样鼻涕', value: 1 },
          { label: '鼻涕有脓液', value: 2 },
          { label: '鼻涕中有血', value: 3 },
        ]
      }],
      options9: [
        { label: '全身乏力', value: 1 },
        { label: '肌肉酸痛', value: 2 },
        { label: '腹泻', value: 3 },
        { label: '恶心', value: 4 },
        { label: '呕吐', value: 5 },
        { label: '头痛', value: 6 },
        { label: '结膜充血', value: 7 },
        { label: '关节疼痛', value: 8 },
        { label: '寒颤', value: 9 },
        { label: '眼眶眼球后等眼部疼痛', value: 10 },
        { label: '出血,包括鼻腔、口腔等部位', value: 11 },
        { label: '皮疹', value: 12 },
        { label: '心悸', value: 13 },
        { label: '食欲不振', value: 14 },
        { label: '尿频尿急尿痛', value: 15 },
        { label: '尿道烧灼感', value: 16 },
        { label: '其他', value: 17 },
        { label: '以上都无', value: 18 },
      ],
      options10: [
        { label: '对某些药物过敏', value: 1 },
        { label: '对某些食物过敏', value: 2 },
        { label: '对其他东西过敏', value: 3 },
        { label: '以上都无', value: 4 }
      ],
      options11: [
        { label: '高血压', value: 1 },
        { label: '糖尿病', value: 2 },
        { label: '冠心病', value: 3 },
        { label: '慢性咽炎', value: 4 },
        { label: '慢性支气管炎', value: 5 },
        { label: '哮喘', value: 6 },
        { label: '艾滋病', value: 7 },
        { label: '慢性阻塞性肺病', value: 8 },
        { label: '慢性肾病', value: 9 },
        { label: '癌症', value: 10 },
        { label: '脑血管病', value: 11 },
        { label: '其他', value: 12 },
        { label: '以上都无', value: 13 }
      ]
    }
  },
  methods: {

    jump (index) {
      let jump = document.getElementsByClassName('section');

      // 获取需要滚动的距离
      let total = jump[index].offsetTop - 80;

      // Chrome
      document.body.scrollTop = total;
      // Firefox
      document.documentElement.scrollTop = total;
      // Safari
      window.pageYOffset = total;
      // $('html, body').animate({
      // 'scrollTop': total
      // }, 400);
    },

    onScroll () {


      let scrolled = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      // 586、1063分别为第二个和第三个锚点对应的距离
      var sections = document.getElementsByClassName('section');
      if (scrolled < sections[0].offsetTop + 90) {
        this.activeStep = 0
      }
      else {
        this.activeStep = 1      }
    },

    q7submit () {
      this.q7popupVisible = false
      this.q7currentTags = this.$refs.Q7picker.getValues()[0]
    },
    q8submit1 () {
      this.q8popupVisible1 = false
      this.q8currentTags1 = this.$refs.Q8picker1.getValues()[0]

    },
    q8submit2 () {
      this.q8popupVisible2 = false
      this.q8currentTags2 = this.$refs.Q8picker2.getValues()[0]
    },
    checkDate (dateStr) {
      console.log(dateStr)
      var that = this
      var a = /^(\d{4})-(\d{2})-(\d{2})$/
      if (!a.test(dateStr.value)) {
        alert("错误！日期格式应为XXXX-XX-XX!");

        // dateStr.focus();
        return false;
      } else {
        return true;
      }

    },
    submitform () {
      if (this.form.name == '') {
        MessageBox.alert('请填写姓名').then(action => {
          this.setItemscroll('name')
        });
      }
      else if (this.form.age == '') {
        MessageBox.alert('请填写年龄').then(action => {
          this.setItemscroll('age')
        });
      }
      // else if (this.form.birthday == '') {
      //   MessageBox.alert('请填写出生年月').then(action => {
      //     this.setItemscroll('birthday')
      //   });
      // }
      else if (this.form.phone == '') {
        MessageBox.alert('请填写联系方式').then(action => {
          this.setItemscroll('phone')
        });
      }
      // else if (this.form.checkInRoom == '') {
      //   MessageBox.alert('请填写入住房间').then(action => {
      //     this.setItemscroll('checkInRoom')
      //   });
      // }
      // else if (this.form.checkInTime == '') {
      //   MessageBox.alert('请填写入住时间').then(action => {
      //     this.setItemscroll('checkInTime')
      //   });
      // }
      // else if (this.form.leaveTime == '') {
      //   MessageBox.alert('请填写预计解除时间').then(action => {
      //     this.setItemscroll('leaveTime')
      //   });
      // }
      // else if (this.form.lastContactTime == '') {
      //   MessageBox.alert('请填写末次接触时间').then(action => {
      //     this.setItemscroll('lastContactTime')
      //   });
      // }
      // else if (this.form.contactHistory == '') {
      //   MessageBox.alert('请填写简要接触史').then(action => {
      //     this.setItemscroll('contactHistory')
      //   });
      // }
      else if (this.form.question1.length < 1) {
        MessageBox.alert('请填写Q1').then(action => {
          this.setItemscroll('q1')
        });
      }
      else if (this.form.question6.length < 1) {
        MessageBox.alert('请填写Q6').then(action => {
          this.setItemscroll('q6')
        });
      }
      else if (this.form.question8.length < 1) {
        MessageBox.alert('请填写Q8').then(action => {
          this.setItemscroll('q8')
        });
      }
      else if (this.form.question9.length < 1) {
        MessageBox.alert('请填写Q9').then(action => {
          this.setItemscroll('q9')
        });
      }
      else if (this.form.question10.length < 1) {
        MessageBox.alert('请填写Q10').then(action => {
          this.setItemscroll('q10')
        });
      }
      else if (this.form.question11.length < 1) {
        MessageBox.alert('请填写Q11').then(action => {
          this.setItemscroll('q11')
        });
      }
      else {
        let q1d = []
        let q2d = []
        let q3d = []
        let q4d = []
        let q5d = []
        let q6d = []
        let q7d = []
        let q8d = []
        let q9d = []
        let q10d = []
        let q11d = []
        let q12d = []

        // , q2d, q3d, q4d, q5d, q6d, q7d, q8d, q9d, q10d, q11d, q12d
        this.form.question1.map(item => {
          if (item == 3) {
            q1d.push({ "chosenindex": item, "p1": this.form.q1_3_p })
          }
          else {
            q1d.push({ "chosenindex": item })
          }
        })
        //造q2d

        console.log(this.form.question2, 'q2')
        if (this.form.question2 == 1) {
          q2d.push({ "chosenindex": 1 })
        }
        else {
          q2d.push({ "chosenindex": 2 })
        }
        //造q3d
        if (this.form.question3 == 1) {
          q3d.push({ "chosenindex": 1 })
        } else {
          q3d.push({ "chosenindex": 2 })
        }
        if (this.form.question4 == 1) {
          q4d.push({ "chosenindex": 1 })
        }
        else {
          q4d.push({ "chosenindex": 2 })
        }
        if (this.form.question5 == 1) {
          q5d.push({ "chosenindex": 1 })
        } else {
          q5d.push({ "chosenindex": 2 })
        }

        //q6d
        this.form.question6.map(item => {
          if (item == 4) {
            q6d.push({ "chosenindex": item, "p1": this.form.q6_4_p })
          }
          else {
            q6d.push({ "chosenindex": item })
          }
        })
        if (this.form.question7 == 1) {
          q7d.push({ "chosenindex": 1, "p1": this.form.q7_1_p, "s1": this.q7currentTags.value })
        }
        else {
          q7d.push({ "chosenindex": 2 })
        }
        this.form.question8.map(item => {
          if (item == 9) {
            q8d.push({ "chosenindex": item, "s1": this.q8currentTags1.value })
          }
          if (item == 10) {
            q8d.push({ "chosenindex": item, "s1": this.q8currentTags2.value })
          }
          if (item == 11) {
            q8d.push({ "chosenindex": item, "p1": this.form.q8_11_p })
          }
          else {
            q8d.push({ "chosenindex": item })
          }
        })

        this.form.question9.map(item => {
          if (item == 17) {
            q9d.push({ "chosenindex": item, "p1": this.form.q9_17_p })
          }
          else {
            q9d.push({ "chosenindex": item })
          }
        })
        this.form.question10.map(item => {
          if (item == 1) {
            q10d.push({ "chosenindex": item, "p1": this.form.q10_1_p })
          }
          if (item == 2) {
            q10d.push({ "chosenindex": item, "p1": this.form.q10_2_p })
          }
          if (item == 3) {
            q10d.push({ "chosenindex": item, "p1": this.form.q10_3_p })
          }
          else {
            q10d.push({ "chosenindex": item })
          }
        })
        this.form.question11.map(item => {
          if (item == 12) {
            q11d.push({ "chosenindex": item, "p1": this.form.q11_12_p })
          }
          else {
            q11d.push({ "chosenindex": item })
          }
        })
        this.form.question12.map(item => {
          if (item == 1) {
            q12d.push({ "chosenindex": item, "p1": this.form.q12_1_p })
          }
          if (item == 2) {
            q12d.push({ "chosenindex": item, "p1": this.form.q12_2_p })
          }
          if (item == 31) {
            q12d.push({ "chosenindex": item, "p1": this.form.q12_3_p })
          }
          if (item == 4) {
            q12d.push({ "chosenindex": item, "p1": this.form.q12_4_p })
          }
          else {

          }
        })

        // console.log(q1d, q2d, q3d, q4d, q5d, q6d, q7d, q8d, q9d, q10d, q11d, q12d)
        axios.post('/newEvaluation', {
          "patientId": this.$route.query.id,
          "name": this.form.name,
          "gender": this.form.gender,
          "age": this.form.age,
          "birthday": this.form.birthday,
          "phone": this.form.phone,
          "address": this.form.address,
          "IDcard": this.form.IDcard,
          "submitUser": '',
          "pregnant": this.form.pregnant,
          "checkInRoom": this.form.checkInRoom,
          "checkInTime": this.form.checkInTime,
          "leaveTime": this.form.leaveTime,
          "lastContactTime": this.form.lastContactTime,
          "occupation": this.form.occupation,
          "contactHistory": this.form.contactHistory,
          "q1": q1d,
          "q2": q2d,
          "q3": q3d,
          "q4": q4d,
          "q5": q5d,
          "q6": q6d,
          "q7": q7d,
          "q8": q8d,
          "q9": q9d,
          "q10": q10d,
          "q11": q11d,
          "q12": q12d,
        }).then(response => {
          console.log(response.data.results)
          MessageBox.alert('填写成功').then(action => {
            this.$router.back(-1)
          })


        })
          .catch(function (error) {
            console.log('error', error)
          })





      }
    },


    setItemscroll (id) {
      let jump = document.getElementById(id);
      // 获取需要滚动的距离
      let total = jump.offsetTop - 120
      document.body.scrollTop = total;        // Firefox
      document.documentElement.scrollTop = total;
      // Safari
      window.pageYOffset = total;
    }



  },
  watch: {

  },
  mounted () {

    window.addEventListener('scroll', this.onScroll)

  },
  beforeDestroy () { //在组件生命周期结束的时候销毁。
    window.removeEventListener('scroll', this.onScroll);
  },

}
</script>


<style>
* {
  padding: 0;
  margin: 0;
}
.wrapper {
  background: #f5f5f9;
}
.section {
  width: 100%;
  text-align: left;
}
.section .card {
  margin: 10px;
  padding: 10px;
  border: 1px solid white;
  background: white;
  border-radius: 5px;
  text-align: left;
}
.sectionLine {
  font-size: 0.87rem;
  color: rgb(0, 153, 255);
  border-bottom-color: rgb(0, 153, 255);
  border-bottom-style: solid;
  border-bottom-width: 1px;
}
.nav1 {
  display: inline-block;
  width: 50%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #eee;
  /* margin: 10px 0; */
}
/* input[type="checkbox"] {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 21px;
  height: 21px;
} */
.section:first-child {
  margin-top: 80px;
  padding-top: 10px;
}
.text1 {
  padding: 5px;
}
.text1:before {
  content: "*";
  color: red;
  margin-right: 4px;
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
input[type="checkbox"]:checked:after {
  content: "✓";
  font-size: 14px;
  font-weight: 600;
  background-color: #36aeff;
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
.picker-toolbar-title {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}
.usi-btn-cancel,
.usi-btn-sure {
  color: #ff6600;
}
.qblock {
  display: inline;
  margin-right: 10px;
}
.text2 {
  padding: 5px;
  margin-left: 10px;
}
.section_title {
  border-left: 0.2em solid rgb(242, 156, 57);
  /* padding-left: 0.2em; */
  line-height: 1;
  font-size: 0.96rem;
  margin-left: 20px;
}
</style>

