import { wrapper } from "../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "yup-phone";
import { createEmployee,updateEmployeeData } from "../../store/actions";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { Loader } from "../../components/loader";
import { getEmployeeDetails } from "../../store/actions";
import { useEffect, useState } from "react";
import { find } from "lodash";



const phoneSchema = Yup.string()
  .phone("LK")
  .required("phone should be Sri Lankan phone");

function EmployeeForm({isNew=false,id=null}) {
  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
    .matches(/[A-Za-z]/,'Only text are allowed')
    .min(6,'Minimum 6 letters required')
    .max(10,'Maximum 10 letters required')
    .required("First name is required"),
    lastName: Yup.string()
    .matches(/[A-Za-z]/,'Only text are allowed')
    .min(6,'Minimum 6 letters required')
    .max(10,'Maximum 10 letters required')
    .required("Last name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    gender: Yup.string().required("Gender is required"),
    phone: phoneSchema,
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset,setValue, formState } = useForm(formOptions);
  const { errors,isSubmitting } = formState;
  const [currentEmp,setCurrentEmp]=useState({});
  const dispatch = useDispatch();

  const employeeData = useSelector((state) => state.employees);

  useEffect(() => {
    if (!isNew) {
        // get user and set form fields
        dispatch(getEmployeeDetails());
        let currentEmployee = find(employeeData.employees,(item)=>{
          return(
            item.id==id
            )
          })
          const fields = ['firstName', 'lastName', 'email', 'phone', 'gender'];
          fields.forEach(field => setValue(field, currentEmployee[field]));
          setCurrentEmp(currentEmployee);
    }
}, []);

   async function onSubmit(data) {
    if(isNew){
      await dispatch(createEmployee(data));
    }else{
       await dispatch(updateEmployeeData(data,id));
    }
    
  }
 
  return (
    <div className="card m-3">
      <div className="d-flex flex-row-reverse">
        <a className="btn btn-primary" href="/" role="button">
          List
          <TableRowsIcon fontSize="small" />
        </a>
      </div>
      <h5 className="card-header">{isNew ? 'Add' :'Edit'} Employee</h5>
      <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group col-5">
                <label>First Name</label>
                <input
                  ref={register}
                  name="firstName"
                  aria-label="First Name"
                  type="text"
                  {...register("firstName")}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.firstName?.message}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-5">
                <label>Last Name</label>
                <input
                  name="lastName"
                  aria-label="Last Name"
                  type="text"
                  {...register("lastName")}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.lastName?.message}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-5">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  aria-label="Email"
                  {...register("email")}
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-5">
                <label>Phone</label>
                <input
                  name="phone"
                  type="text"
                  aria-label="Phone"
                  {...register("phone")}
                  className={`form-control ${
                    errors.phone ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.phone?.message}</div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-5">
                <label>Gender</label>
                <select
                  name="gender"
                  data-testid="select"
                  aria-label="Gender"
                  {...register("gender")}
                  className={`form-control ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                >
                  <option value=""></option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
                <div className="invalid-feedback">{errors.gender?.message}</div>
              </div>
            </div>

            <div className="form-group">
            <button disabled={isSubmitting} className="btn btn-primary mr-1">
            {isSubmitting  ? <Loader/> : "Submit"}
             </button>
              
            </div>
          </form>
         
      </div>
    </div>
  );
}

export default wrapper.withRedux(EmployeeForm);
