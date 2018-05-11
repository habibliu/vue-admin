import Mock from 'mockjs';

const Students = [];

const Parents = [];

const currentDate = new Date();

for (let i = 0; i < 150; i++) {
  var birthDate=Mock.Random.date();
  var borthYear=parseInt(birthDate.substring(0,5));
  var age = currentDate.getFullYear()-borthYear;
  if (age < 5) {
    continue;
  } 
  Students.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    birth: birthDate,
    age:age,
    sex: Mock.Random.integer(0, 1),
    parent: Mock.Random.cname()
  }));
}


for (let i = 0; i < 56; i++) {
  Parents.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|33-56': 38,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    telephone: Mock.Random.integer(13000000000,13999999999)
  }));
} 
export { Students, Parents};
