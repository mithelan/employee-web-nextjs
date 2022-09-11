import { wrapper } from "../../store/store";
import EmployeeForm from "./form";

function EmployeeAdd() {
  return <EmployeeForm isNew={true} />;
}

export default wrapper.withRedux(EmployeeAdd);
