import React, { useEffect } from "react";
import { wrapper } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeDetails } from "../../store/actions";
import List from "./list";

function EmployeeDetails() {
  const employeeData = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeDetails());
  }, []);

  return (
    <>
      <List employeeData={employeeData} />
    </>
  );
}

export default wrapper.withRedux(EmployeeDetails);

