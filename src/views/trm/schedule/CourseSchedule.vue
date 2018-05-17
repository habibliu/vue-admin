<template>
  <section>

    <!--新增界面-->
      
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple" style="padding-top:20px;"></div>
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" >
              <el-form-item label="课程名称" prop="name">
                <el-select v-model="addForm.course" filterable placeholder="请选择" @change="getStudents">
                  <el-option
                    :remote-method="getCourses"
                    v-for="item in courses"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教练">
                <el-select v-model="addForm.coache" filterable placeholder="请选择">
                  <el-option
                    :remote-method="getCoaches"
                    v-for="item in coaches"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="场地">
                <el-select v-model="addForm.venue" filterable placeholder="请选择">
                  <el-option
                    :remote-method="getVenues"
                    v-for="item in venues"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教学日期">
                <el-date-picker type="dates" placeholder="选择一个或多个日期" v-model="addForm.dates"></el-date-picker>
              </el-form-item>
            </el-form>
            <el-table :data="students" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column type="index" width="60">
              </el-table-column>
              <el-table-column prop="name" label="学员姓名" width="120" sortable>
              </el-table-column>
              <el-table-column prop="birth" label="课程节数" width="120" sortable>
              </el-table-column>
              <el-table-column prop="addr" label="未排期" min-width="120" sortable>
              </el-table-column>
              
            </el-table>

          </el-col>
          <el-col :span="16"><div class="grid-content bg-purple"></div>
            <full-calendar 
              :events="calendarOptions.events" 
              lang="zh"
              :firstDay=1>
            </full-calendar>
          </el-col>
        </el-row>
        
      
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading" >提交</el-button>
      </div>
  </section>
</template>

<script>
  import util from '../../../common/js/util'
  //import NProgress from 'nprogress'
  import { getCourseList, getCoachList, getVenueList,getCourseStudents } from './api';

  export default {
    data() {
      return {
        calendarOptions: {
          events :[
            {
              title : '2018夏季提高班',
              start : '2018-05-25',
              end : '2018-05-25',
              cssClass  : 'family'
            },
            {
              title : '2018夏季基础班',
              start : '2018-05-25',
              end : '2018-05-25',
              cssClass  : 'family'
            }
          ],
          lang  : {
            weekNames : ['周一','周二','周三','周四','周五','周六','周日'],
            monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','11月','12月'],
            titleFormat : 'yyyy年MM月'
          }
         
        },
        courses: [],
        coaches: [],
        venues: [],
        students: [],
        listLoading: false,
        sels: [],//列表选中列

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ]
        },
        

        addFormVisible: true,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          course: '',
          coach: '',
          venue: '',
          dates: [],
        }

      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getSchedules();
      },
      getCourses(){//获取课程
        let para = {
          name: '2018',
        };
        getCourseList(para).then((res) => {
          if( res && res.data){
            this.courses = res.data.courses;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getCoaches(){
        let para = {
        };
        getCoachList(para).then((res) => {
          if( res && res.data){
            this.coaches = res.data.coaches;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getVenues(){
        let para = {
        };
        getVenueList(para).then((res) => {
          if( res && res.data){
            this.venues = res.data.venues;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getStudents(){
        debugger;
        let para = {
          course:this.addForm.course
        };

        getCourseStudents(para).then((res) => {
          if( res && res.data){
            this.students = res.data.students;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
     
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              addSchedule(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getSchedules();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      }
    },
    components : {
      'full-calendar': require('vue-fullcalendar')  
    },
    mounted() {//默认页面加截方法
      this.getCourses();
      this.getCoaches();
      this.getVenues();
    }
  }

</script>

<style scoped>
.el-dialog.el-dialog--width-auto{
  width:auto !important;
}
</style>