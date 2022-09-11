import { wrapper } from "../../store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeDetails } from "../../store/actions";
import List from "./list";

function EmployeeDetails({ Component, pageProps }) {
  const employeeData = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeDetails());
  }, []);

  return (
   <List employeeData={employeeData} />
  );
}

export default wrapper.withRedux(EmployeeDetails);
