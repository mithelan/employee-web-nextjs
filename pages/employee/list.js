import { wrapper } from "../../store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getEmployeeDetails } from "../../store/actions";
import EmployeeTable from "./table";
import EmployeesList from "./employeesList";
import TableRowsIcon from "@mui/icons-material/TableRows";
import WindowIcon from "@mui/icons-material/Window";
import { debounce, isEmpty } from "lodash";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {Loader} from "../../components/loader";

function List(data) {
  let { employeeData } = data;
  const [view, setView] = useState(true);
  const [gender, setGender] = useState("");
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  function handleClick() {
    setView(!view);
  }

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
    dispatch(getEmployeeDetails(gender, event.target.value));
  };

  const handleChange = (event) => {
    setGender(event.target.value);
    dispatch(getEmployeeDetails(event.target.value, keyword));
  };
  return (
    <>
      <TextField
        size="small"
        id="demo-helper-text-aligned"
        label="Search"
        onChange={debounce((e, obj) => handleInputChange(e), 500, {
          leading: true,
        })}
        data-testid="search-field"
        className="mr-2"
      />

      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Gender</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"M"}>Male</MenuItem>
          <MenuItem value={"F"}>Female</MenuItem>
        </Select>
      </FormControl>
      {isEmpty(employeeData.employees) ? (
        <div className="jumbotron">
          <h1 className="display-4">No Employees Data...</h1>
          <p className="lead">Create an employee record</p>
          <hr className="my-4" />
          <a href="/employee/add">
            <button className="btn btn-primary mr-3">Add Employee</button>
          </a>
        </div>
      ) : (
        <div className="card m-3" data-testid="grid-view">
          <div className="d-flex flex-row-reverse mt-2">
            <button className="btn btn-primary mr-3" onClick={handleClick}>
              Change View
              {view ? (
                <WindowIcon fontSize="small" />
              ) : (
                <TableRowsIcon fontSize="small" />
              )}
            </button>
            <a href="/employee/add">
              <button className="btn btn-primary mr-3">Add Employee</button>
            </a>
          </div>
              {employeeData.employeesDataLoading ?
      <Loader/>
    : 
          <div className="form-row m-3">
            {view ? (
              <EmployeesList employeeData={employeeData} />
            ) : (
              <EmployeeTable employeeData={employeeData} />
            )}
          </div>
}
        </div>
      )}
    </>
  );
}

export default wrapper.withRedux(List);
