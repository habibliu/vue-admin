<template>
  <el-row :gutter="20">
    <el-col :span="8" >
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree2">
      </el-tree>
    </el-col>
   
    <el-col :span="16">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
        
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">修复</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm"  class="demo-ruleForm">
        <el-form-item label="组织名称 " prop="name">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织编号">
          <el-input  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="组织类型">
          <el-radio-group >
            <el-radio class="radio" :label="1">区域公司</el-radio>
            <el-radio class="radio" :label="2">分公司</el-radio>
            <el-radio class="radio" :label="3">经销商</el-radio>
            <el-radio class="radio" :label="4">管理处</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" ></el-input>
        </el-form-item>

        <el-form-item :align="center">
          <el-button >取消</el-button>
          <el-button type="primary" >提交</el-button>
        </el-form-item>
      </el-form>
     
    </el-col>

  </el-row>

</template>

<script>
  
  import { getTreeData, removeOrganization, editOrganization, addOrganization } from './api';
  export default {
   
     watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleAdd(){

      },

      getTreeData(){

      }
    },

    data() {
      return {
        filterText: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
 
  };
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

