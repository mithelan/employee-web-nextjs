import axios from 'axios';  
import { authMsg, getCommonError } from '../../utill';


/*** TYPES ***/
const GET_EMPLOYEE_DATA = 'GET_EMPLOYEE_DATA';
const UPDATE_EMPLOYEE_DATA='UPDATE_EMPLOYEE_DATA';
const GET_EMPLOYEE_DATA_LOADING="GET_EMPLOYEE_DATA_LOADING";
const ADD_EMPLOYEE_LOADING='ADD_EMPLOYEE_LOADING';
const DELETE_EMPLOYEE_LOADING="DELETE_EMPLOYEE_LOADING";
/*** REDUCERS ***/
const initialState = {
  employees:[],
  employeesDataLoading: false,
  addLoading:false,
  deleteLoading:false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE_DATA:
      return { ...state, employees: action.payload };
      case GET_EMPLOYEE_DATA_LOADING:
      return { ...state, employeesDataLoading: action.payload };
      
    case UPDATE_EMPLOYEE_DATA:
    return { ...state, employees: action.payload };
    case ADD_EMPLOYEE_LOADING:
    return { ...state, addLoading: action.payload };
    case DELETE_EMPLOYEE_LOADING:
    return { ...state, deleteLoading: action.payload };
    
    default:
      return state;
  }
}

/*** ACTIONS ***/


export function getEmployeeDetails(gender="",keyword="") {
  return async dispatch => {
    try {
      let params={
        gender: gender,
        keyword:keyword
      }
      dispatch({ type: GET_EMPLOYEE_DATA_LOADING, payload: true });
      const response = await axios.get(`/all-employees`,{
        params,
      });
      dispatch({ type: GET_EMPLOYEE_DATA, payload: response.data });
      dispatch({ type: GET_EMPLOYEE_DATA_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_EMPLOYEE_DATA_LOADING, payload: false });
      console.error("error: ", error);
    }
  };
}

export function createEmployee(data) {
  return async dispatch => {
    return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: ADD_EMPLOYEE_LOADING, payload: true });
      const response = await axios.post(`/add-employee`,data);
      authMsg('success', [
        'Employee Successfully Added',
        'Employee Info',
      ]);
      resolve(response.status);
      dispatch({ type: ADD_EMPLOYEE_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: ADD_EMPLOYEE_LOADING, payload: false });
      authMsg('error', getCommonError(error));
      reject();
    }
  });
};
}
export function updateEmployeeData(values,id) {
  return async dispatch => {
    try {
      const response = await axios.put(`/update-employee/${id}`,values);
      dispatch({ type: UPDATE_EMPLOYEE_DATA, payload: response.data });
      authMsg('success', [
        'Employee Successfully Updated',
        'Employee Info',
      ]);
      await dispatch(getEmployeeDetails())
    } catch (error) {
      authMsg('error', getCommonError(error));
    }
  };
}


export function deleteEmployeeData(id) {
  return async dispatch => {
    try {
      dispatch({ type: DELETE_EMPLOYEE_LOADING, payload: true });
      const response = await axios.delete(`/delete/${id}`);
      dispatch({ type: DELETE_EMPLOYEE_LOADING, payload: false });
      await dispatch(getEmployeeDetails())
    } catch (error) {
      dispatch({ type: DELETE_EMPLOYEE_LOADING, payload: false });
      authMsg('error', getCommonError(error));
    }
  };
}
