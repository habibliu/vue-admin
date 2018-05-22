import Mock from 'mockjs';

const Rules = [];

if(Rules.length==0){
  for (let i = 0; i < 10; i++) {
  Rules.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|8-20': 8,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    telphone: Mock.Random.integer(13000000000,13999999999)
  }));
}
}


export { Rules };
