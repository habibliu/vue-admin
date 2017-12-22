

const OrganizationData=[{
  id: 1,
  code:'000000',
  label: '恒大集团 0',
  children:[
  {
    id: 1,
    code:'001',
    label: '华南区 1',
    children: [{
      id: 4,
      label: '广州分公司 1-1',
      children: [{
        id: 9,
        label: '恒大山水城 1-1-1'
      }, {
        id: 10,
        label: '星湖水郡 1-1-2'
      }]
    }]
  }, {
    id: 2,
    label: '华北区 2',
    children: [{
      id: 5,
      label: '北京分公司 2-1'
    }, {
      id: 6,
      label: '天津分公司 2-2'
    }]
  }, {
    id: 3,
    label: '华东区 3',
    children: [{
      id: 7,
      label: '上海分公司 3-1'
    }, {
      id: 8,
      label: '南京分公司 3-2'
    }]
  }]
}];


export  { OrganizationData };