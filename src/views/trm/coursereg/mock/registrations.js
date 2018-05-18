import Mock from 'mockjs';

import { Students } from '../../../master/student/mock/students';
import { Courses } from '../../../master/course/mock/courses';


const Registrations = [];


for (let i = 0; i < 102; i++) {
  var course=Courses[Mock.Random.integer(0, Courses.length-1)];
  var student=Students[Mock.Random.integer(0, Students.length-1)];
  var payoff=Mock.Random.integer(0, 1);
  var registerDate=Mock.Random.date();
  Registrations.push(Mock.mock({
    id: Mock.Random.guid(),
    courseName: course.name,
    courseGrade: course.grade,
    coursePhase: course.phase,
    coursePrice: course.price,
    payoff:payoff,
    studentName: student.name,
    studentSchool: student.school,
    studentSex: student.sex,
    studentAge: student.age,
    studentTelephone: student.telephone,
    registerDate: Mock.Random.date(),
    paymentDate: payoff==1?registerDate:''
  }));
}

export { Registrations };
