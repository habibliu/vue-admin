import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LoginMock from '@/views/login/mock/mock';
import EmployeeMock from '@/views/orgmgt/employee/mock/mock';
import OrganizationMock from '@/views/orgmgt/organization/mock/mock';


export default {
  /**
   * mock bootstrap
   */

  bootstrap() {

    let mock = new MockAdapter(axios);


    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });
  
    debugger;
    try{
      LoginMock(mock);
      EmployeeMock(mock);
      OrganizationMock(mock);
    }catch(error){
      console.log(error);
    }
    
  }

};