
import styles from '../styles/Home.module.css'
import EmployeeDetails from './employee/employeeDetails'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Employee Management</h1>
       <EmployeeDetails  /> 
    </div>
  )
}
