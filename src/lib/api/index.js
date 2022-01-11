import Email from '@material-ui/icons/Email';

import { useState } from 'react';
import httpService from '../../../lib/httpService';

//we will make httpService api's here

export const Login = async (data) => {
  const LoginResponse = new Promise(async (resolve) => {
    httpService
      .post('#', data) //  httpService for login

      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return LoginResponse.data;
};

export const applyJobs = async () => {
  const JobsResponse = new Promise(async (resolve) => {
    httpService
      .get('#') //  httpService for jobs
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return JobsResponse.data;
};

export const AdminDashboard = async () => {
  const AdminResponse = new Promise(async (resolve) => {
    httpService
      .get('#') //  httpService for admin dashboard
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AdminResponse.data;
};
export const AddSchedule = async (data) => {
  const AddScheduleResponse = new Promise(async (resolve) => {
    httpService
      .post('#', data) //  httpService for add schdule form
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddScheduleResponse.data;
};
export const AddShifts = async (data) => {
  const AddScheduleResponse = new Promise(async (resolve) => {
    httpService
      .post('#', data) //  httpService for add schdule form
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddShiftResponse.data;
};
export const ShiftSchedule = async (data) => {
  const ShiftScheduleResponse = new Promise(async (resolve) => {
    httpService
      .post('#', data) //  httpService for add shift schdule form
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return ShiftScheduleResponse.data;
};
export const Designation = async () => {
  const ShiftScheduleResponse = new Promise(async (resolve) => {
    httpService
      .get('#', data) //  httpService for designation form
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return DesignationResponse.data;
};
export const AddDesignation = async (data) => {
  const AddDesignationResponse = new Promise(async (resolve) => {
    httpService
      .post('#', data) //  httpService for add designnation form
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddDesignationResponse.data;
};
export const Department = async () => {
  const DepartmentResponse = new Promise(async (resolve) => {
    httpService
      .get('#') //  httpService for department
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return DepartmentResponse.data;
};
export const AddDepartment = async (data) => {
  const AddDepartmentResponse = new Promise(async (resolve) => {
    httpService
      .get('#', data) //  httpService for add department form
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddDepartmentResponse.data;
};
export const LeaveType = async () => {
  const LeaveTypeResponse = new Promise(async (resolve) => {
    httpService
      .get('#') //  httpService for leave type
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return LeaveTypeResponse.data;
};

export const AddLeaveType = async (data) => {
  const AddLeaveTypeResponse = new Promise(async (resolve) => {
    httpService
      .post('#', data) //  httpService for  add leave type
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddLeaveTypeResponse.data;
};

export const Holiday = async () => {
  const HolidayResponse = new Promise(async (resolve) => {
    httpService
      .get('#', { headers: headers }) //  httpService for  Holiday
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return HolidayResponse.data;
};
export const AddHoliday = async (data) => {
  const AddHolidayResponse = new Promise(async (resolve) => {
    httpService
      .get('#', { headers: headers }, data) //  httpService for  add holiday
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddHolidayResponse.data;
};
export const AllEmployee = async () => {
  const AllEmployeeResponse = new Promise(async (resolve) => {
    httpService
      .get('#', { headers: headers }) //  httpService for all employee
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AllEmployeeResponse.data;
};
export const AddEmployee = async (data) => {
  const AddEmployeeResponse = new Promise(async (resolve) => {
    httpService
      .get('#', { headers: headers }, data) //  httpService for  add employee
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddEmployeeResponse.data;
};
export const Payment = async () => {
  const PaymentResponse = new Promise(async (resolve) => {
    httpService
      .get('#', { headers: headers }) //  httpService for payment

      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return PaymentResponse.data;
};
export const Invoices = async () => {
  const InvoicesResponse = new Promise(async (resolve) => {
    httpService
      .get('#', { headers: headers }, data) //  httpService for Invoices

      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return InvoicesResponse.data;
};
export const Estimates = async () => {
  const EstimatesResponse = new Promise(async (resolve) => {
    httpService
      .get('#', { headers: headers }, data) //  httpService for Estimates

      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return EstimatesResponse.data;
};
export const Clients = async () => {
  const ClientsResponse = new Promise(async (resolve) => {
    httpService
      .get('#', { headers: headers }) //  httpService for clients

      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return ClientsResponse.data;
};
export const AddClients = async (data) => {
  const AddClientsResponse = new Promise(async (resolve) => {
    httpService
      .post('#', data) //  httpService for clients

      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddClientsResponse.data;
};
export const Categories = async () => {
  const CategoriesResponse = new Promise(async (resolve) => {
    httpService
      .get('#') //  httpService for clients

      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return CategoriesResponse.data;
};

export const AddCategory = async (data) => {
  const AddCategoryResponse = new Promise(async (resolve) => {
    httpService
      .post('#', data) //  httpService for clients

      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddCategoryResponse.data;
};

export const AddInvestment = async (data) => {
  const AddInvestmentResponse = new Promise(async (resolve) => {
    httpService
      .post('#', data) //  httpService for clients

      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: 'Server Issue Please try again Later',
        });
      });
  });

  return AddInvestmentResponse.data;
};
