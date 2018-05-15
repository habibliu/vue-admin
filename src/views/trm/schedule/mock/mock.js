//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';
import { Schedules } from './schedules';
let _Schedules = Schedules;


const CourseScheduleMock = mock => {

    //获取场地列表
    mock.onGet('/CourseSchedule/list').reply(config => {
      let {name} = config.params;
      let mockVenues = _Schedules.filter(schedule => {
        if (name && schedule.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            schedules: mockVenues
          }]);
        }, 1000);
      });
    });

    //获取场地列表（分页）
    mock.onGet('/CourseSchedule/listpage').reply(config => {
      let {page, name} = config.params;
      let mockVenues = _Schedules.filter(schedule => {
        if (name && schedule.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockVenues.length;
      mockVenues = mockVenues.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            schedules: mockVenues
          }]);
        }, 1000);
      });
    });

    //删除场地
    mock.onGet('/CourseSchedule/remove').reply(config => {
      let { id } = config.params;
      _Schedules = _Schedules.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除场地
    mock.onGet('/CourseSchedule/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Schedules = _Schedules.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑场地
    mock.onGet('/CourseSchedule/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Schedules.some(u => {
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

    //新增场地
    mock.onGet('/CourseSchedule/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Schedules.push({
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
export default CourseScheduleMock;