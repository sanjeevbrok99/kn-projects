import httpService from '../httpService';

export async function Login(userName, password) {
  const LoginResponse = new Promise(async (resolve) => {
    httpService
      .post('/auth/login', { userName, password })
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error ',
        });
      });
  });
  return LoginResponse;
}

export async function getDashboard() {
  const dashboard = new Promise(async (resolve) => {
    httpService
      .get('/dashboard')
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return dashboard;
}

export async function allemployee() {
  const employeeResponse = new Promise(async (resolve) => {
    httpService
      .get('/employee')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return employeeResponse;
}

export async function addemployee(data) {
  const addEmployeeResponse = new Promise(async (resolve) => {
    httpService
      .post('/employee', data)
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return addEmployeeResponse;
}

export async function fetchholiday() {
  const holidayResponse = new Promise(async (resolve) => {
    httpService
      .get('/holiday')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return holidayResponse;
}

export async function addholiday(data) {
  const addHolidayResponse = new Promise(async (resolve) => {
    httpService
      .post('/holiday', data)
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return addHolidayResponse;
}

export async function fetchdepartment() {
  const departmentResponse = new Promise(async (resolve) => {
    httpService
      .get('/department')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return departmentResponse;
}

export async function fetchOvertime() {
  const overtimeResponse = new Promise(async (resolve) => {
    httpService
      .get('/overtime')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return overtimeResponse;
}

export async function fetchJobs() {
  const fetchJobsResponse = new Promise(async (resolve) => {
    httpService
      .get('/job')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchJobsResponse;
}

export async function addJob(data) {
  const addJobResponse = new Promise(async (resolve) => {
    httpService
      .post('/job', data)
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return addJobResponse;
}

export async function fetchInvestment() {
  const fetchInvestmentResponse = new Promise(async (resolve) => {
    httpService
      .get('/investment')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchInvestmentResponse;
}

export async function fetchTax() {
  const fetchTaxResponse = new Promise(async (resolve) => {
    httpService
      .get('/tax')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchTaxResponse;
}

export async function fetchGoals() {
  const fetchGoalTypeResponse = new Promise(async (resolve) => {
    httpService
      .get('/goal-type')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchGoalTypeResponse;
}

export async function fetchGoalList() {
  const GoalListResponse = new Promise(async (resolve) => {
    httpService
      .get('/goal')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return GoalListResponse;
}

export async function fetchPayment() {
  const fetchPaymentResponse = new Promise(async (resolve) => {
    httpService
      .get('/sale-payment')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchPaymentResponse;
}

export async function fetchEstimate() {
  const fetchEstimateResponse = new Promise(async (resolve) => {
    httpService
      .get('/sale-payment')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchEstimateResponse;
}

export async function fetchCandidate() {
  const fetchCandidateResponse = new Promise(async (resolve) => {
    httpService
      .get('/candidate')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchCandidateResponse;
}

export async function fetchProjects() {
  const fetchCandidateResponse = new Promise(async (resolve) => {
    httpService
      .get('/project')
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchCandidateResponse;
}

export async function fetchProject(data) {
  const fetchCandidateResponse = new Promise(async (resolve) => {
    httpService
      .post('/project', data)
      .then((response) => {
        console.log(response);
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchCandidateResponse;
}

export async function fetchVendor() {
  const fetchVendorResponse = new Promise(async (resolve) => {
    httpService
      .get('/vendor')
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchVendorResponse;
}

export async function fetchExpense() {
  const fetchExpenseResponse = new Promise(async (resolve) => {
    httpService
      .get('/expense')
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchExpenseResponse;
}

export async function fetchTicket() {
  const fetchTicketResponse = new Promise(async (resolve) => {
    httpService
      .get('/ticket')
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchTicketResponse;
}

export async function fetchSingleTicket(id) {
  const fetchTicketResponse = new Promise(async (resolve) => {
    httpService
      .get(`/ticket/${id}`)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchTicketResponse;
}

export async function updateTicket(id,data) {
  const fetchTicketResponse = new Promise(async (resolve) => {
    httpService
      .put(`/ticket/${id}`,data)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchTicketResponse;
}

export async function deleteTicket(id) {
  const fetchTicketResponse = new Promise(async (resolve) => {
    httpService
      .delete(`/ticket/${id}`)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchTicketResponse;
}


export async function addTicket(data) {
  const fetchTicketResponse = new Promise(async (resolve) => {
    httpService
      .post('/ticket', data)
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchTicketResponse;
}


export async function fetchBill() {
  const fetchBillResponse = new Promise(async (resolve) => {
    httpService
      .get('/bill')
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        return resolve({
          error: true,
          message: err.response.message || 'Internal Server Error',
        });
      });
  });
  return fetchBillResponse;
}
