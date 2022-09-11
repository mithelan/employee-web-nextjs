
import styles from '../styles/Home.module.css'
import EmployeeDetails from './employee/employeeDetails'
import axios from 'axios';
import { BASE_URL } from '../constant';

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 60000;

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Employee Management</h1>
       <EmployeeDetails  /> 
    </div>
  )
}
