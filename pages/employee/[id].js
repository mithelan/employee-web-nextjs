import { wrapper } from "../../store/store";
import { useRouter } from "next/router";
import EmployeeForm from "./form";

function EditForm() {
  const router = useRouter();
  const { id } = router.query;
  return <EmployeeForm isNew={false} id={id} />;
}

export default wrapper.withRedux(EditForm);
