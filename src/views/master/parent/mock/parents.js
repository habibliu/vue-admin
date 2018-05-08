import Mock from 'mockjs';

const Parents = [];

for (let i = 0; i < 123; i++) {
  Parents.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|8-20': 8,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    parent: Mock.Random.cname()
  }));
}

export { Parents };
