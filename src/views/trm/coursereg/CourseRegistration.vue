<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="课程名称">
          <el-input v-model="filters.name" placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="filters.telphone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getRegistrations">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="registrations" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="studentName" label="学员姓名" width="120" sortable>
      </el-table-column>
      <el-table-column prop="studentSex" label="性别" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="studentAge" label="年龄" width="100" sortable>
      </el-table-column>
      <el-table-column prop="studentSchool" label="在读学校" width="180" sortable>
      </el-table-column>
      <el-table-column prop="studentTelephone" label="学员电话" width="140" sortable>
      </el-table-column>
      <el-table-column prop="registerDate" label="报名日期" width="120" sortable>
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" width="180" sortable>
      </el-table-column>
       <el-table-column prop="courseGrade" label="课程级别" width="120" :formatter="formatGrade" sortable>
      </el-table-column>
       <el-table-column prop="coursePhase" label="课程阶段" width="120" :formatter="formatPhase" sortable>
      </el-table-column>
      <el-table-column prop="coursePrice" label="学费" width="120" sortable>
      </el-table-column>
      <el-table-column prop="payoff" label="是否已缴纳" width="120" :formatter="formatPayoff" sortable>
      </el-table-column>
      <el-table-column prop="paymentDate" label="缴费日期" width="120" sortable>
      </el-table-column>
      
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" width="80%">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple"></div>
            <el-form-item label="学员姓名" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="editForm.sex">
                <el-radio class="radio" :label="1">男</el-radio>
                <el-radio class="radio" :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="parentTelephone">
              <el-input v-model="editForm.telephone" placeholder="学员手机号码"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="editForm.age" :disabled=true></el-input-number>
            </el-form-item>
            <el-form-item label="身高">
              <el-input-number v-model="editForm.height" ></el-input-number>
            </el-form-item>
            <el-form-item label="就读学校">
              <el-select v-model="editForm.school" filterable placeholder="请选择">
                <el-option
                  :remote-method="getSchools"
                  :loading="loading"
                  v-for="item in schools"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div>
            <el-form-item label="家长姓名" prop="parentName">
              <el-input v-model="editForm.parentName" filterable placeholder="请输入家姓名" ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="editForm.parentSex">
                <el-radio class="radio" :label="1">男</el-radio>
                <el-radio class="radio" :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" prop="parentTelephone">
              <el-input v-model="editForm.parentTelephone" placeholder="家长手机号码"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input v-model="editForm.parentWx" placeholder="家长微信号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div>
            <el-form-item label="课程名称" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="级别">
              <el-select v-model="editForm.grade" placeholder="请选择" :disabled=true>
                <el-option label="全部" value=""></el-option>
                <el-option label="幼儿班" value="1"></el-option>
                <el-option label="基础班" value="2"></el-option>
                <el-option label="提高班" value="3"></el-option>
                <el-option label="精英班" value="4"></el-option>
              </el-select>
            </el-form-item>
           <el-form-item label="阶段">
              <el-select v-model="editForm.phase" placeholder="请选择" :disabled=true>
                <el-option label="全部" value=""></el-option>
                <el-option label="第一阶段" value="1"></el-option>
                <el-option label="第二阶段" value="2"></el-option>
                <el-option label="第三阶段" value="3"></el-option>
                <el-option label="第四阶段" value="4"></el-option>
              </el-select>
            </el-form-item>
           
             <el-form-item label="每期定价" >
              <el-input v-model="editForm.price" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="每期节数" >
              <el-input v-model="editForm.sections" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="报名期数" >
              <el-input-number v-model="editForm.sections" :min=1 size="small"></el-input-number>
            </el-form-item>
            <el-form-item label="赠送节数">
              <template slot-scope="scope">
                <el-input-number v-model="editForm.git"   size="small"></el-input-number>
                <el-checkbox v-model="checked">自动</el-checkbox>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div>
            <el-form-item label="总金额" >
              <el-input v-model="editForm.totalAmout" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="总节数" >
              <el-input v-model="editForm.sections" :disabled=true></el-input>
            </el-form-item>
            <el-form-item label="学费已缴" >
              <el-checkbox v-model="checked"></el-checkbox>
            </el-form-item>
            <el-form-item label="缴费日期" >
              <el-date-picker v-model="editForm.paymentDate" type="date"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.memo" rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="租赁日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addForm.telphone" ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../../common/js/util'
  //import NProgress from 'nprogress'
  import { getRegistrationListPage, removeRegistration, batchRemoveRegistration, editRegistration, addRegistration } from './api';

  export default {
    data() {
      return {
        filters: {//过滤条件
          name: '',
          telphone: ''
        },
        registrations: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          telphone: 0,
          birth: '',
          addr: '',
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          telphone: 0,
          birth: '',
          addr: '',
        }

      }
    },
    methods: {
      //性别显示转换
      formatSex: function (row, column) {
        return row.studentSex == 1 ? '男' : row.studentSex == 0 ? '女' : '未知';
      },
      formatPayoff: function (row, column) {
        return row.payoff == 1 ? '已付' : row.payoff == 0 ? '未付' : '未付';
      },
      formatGrade: function (row, column) {
        return row.courseGrade['name'];
      },
      formatPhase: function (row, column){
        debugger;
        return row.coursePhase['name'];
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getRegistrations();
      },
      //获取场地列表
      getRegistrations() {
        let para = {
          page: this.page,
          name: this.filters.name,
          sex: this.filters.sex,
          telphone: this.filters.telphone
        };
        this.listLoading = true;
        getRegistrationListPage(para).then((res) => {
          debugger;
          if( res && res.data){
            this.total = res.data.total;
            this.registrations = res.data.registrations;
          
          }
          this.listLoading = false;
        }).catch((error) => {
          this.listLoading = false;
          console.log(error);
        });
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeRegistration(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getRegistrations();
          });
        }).catch(() => {
          this.listLoading = false;
        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          sex: -1,
          telphone: 0,
          birth: '',
          addr: ''
        };
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              editRegistration(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getRegistrations();
              });
            });
          }
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
              addRegistration(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getRegistrations();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveRegistration(para).then((res) => {
            
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getRegistrations();
            this.listLoading = false;
          });
        }).catch(() => {
          this.listLoading = false;
        });
      }
    },
    mounted() {//默认页面加截方法
      this.getRegistrations();
    }
  }

</script>

<style scoped>

</style>