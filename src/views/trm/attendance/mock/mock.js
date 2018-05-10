//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Attendances } from './attendances';
debugger;
let _Attendances = Attendances;


const CourseMock = mock => {

    //获取员工列表
    mock.onGet('/Attendance/list').reply(config => {
      debugger;
      let {name} = config.params;
      let mockAttendances = _Attendances.filter(attendance => {
        if (name && attendance.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            attendances: mockAttendances
          }]);
        }, 1000);
      });
    });

    //获取员工列表（分页）
    mock.onGet('/Attendance/listpage').reply(config => {
      debugger;
      let {page, name, sex, phone} = config.params;
      let mockAttendances = _Attendances.filter(attendance => {
        if (name && attendance.name.indexOf(name) == -1) return false;
        if (sex && attendance.sex != sex) return false;
        if (phone && attendance.phone.indexOf(phone) == -1) return false;
        return true;
      });
      let total = mockAttendances.length;
      mockAttendances = mockAttendances.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            attendances: mockAttendances
          }]);
        }, 1000);
      });
    });

    //删除员工
    mock.onGet('/Attendance/remove').reply(config => {
      let { id } = config.params;
      _Attendances = _Attendances.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除员工
    mock.onGet('/Attendance/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Attendances = _Attendances.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑员工
    mock.onGet('/Attendance/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Attendances.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增员工
    mock.onGet('/Attendance/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Attendances.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });
};
//要用这种方式导出;
export default CourseMock;