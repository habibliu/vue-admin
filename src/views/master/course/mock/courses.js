import Mock from 'mockjs';

const Courses = [];

const years=['2017','2018'];
const grades=[{id:1,name:'幼儿班',sections:8,price:800},{id:2,name:'基础班',sections:8,price:800},{id:3,name:'提高班',sections:16,price:1200},{id:4,name:'精英班',sections:24,price:1800}];
const phases=[{id:1,name:'第一阶段'},{id:2,name:'第二阶段'},{id:3,name:'第四阶段'},{id:4,name:'第四阶段'}];

for (let i = 0; i < 41; i++) {
  var grade=grades[Mock.Random.integer(0, 3)];
  Courses.push(Mock.mock({
    id: Mock.Random.guid(),
    name:years[Mock.Random.integer(0, 1)]+grade['name'],
    grade: grade,
    phase: phases[Mock.Random.integer(0, 3)],
    sections: grade['sections'],
    price: grade['price'],
  }));
}

export { Courses };
