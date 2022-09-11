import Home from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "../pages/employee/form";
import EmployeeDataEmpty from './employeeDataEmpty.json';
import MockEmployeeData from './employeeData.json';
import List from "../pages/employee/list";

const formInputValues = [
  {
    label: 'First Name',
    correctTestValue: 'Dhanush',
  },
  {
    label: 'Last Name',
    correctTestValue: 'Karthik',
  },
  {
    label: 'Email',
    correctTestValue: 'karthi@gmail.com',
  },
  {
    label: 'Phone',
    correctTestValue: '94778283332',
  },
  {
    label: 'Gender',
    correctTestValue: 'M',
  },
  ,
];



describe("Employee Home Page", () => {
    it("renders a home with search functionalities", () => {
      render(<Home />);
      const heading = screen.getByText(
        /Employee Management/i
      );
      expect(heading).toBeInTheDocument();
      const search = screen.getByLabelText('Search');
      const gender = screen.getByLabelText('Gender')
      expect(search).toBeInTheDocument();
      expect(gender).toBeInTheDocument();
    
    });
    
    it('Should render all add form inputs', () => {
      render(
          //isNew for add form inputs
          <Form isNew={true} />
      );
      //check for all form fields
      formInputValues.forEach((value, index) => {
        expect(screen.getByLabelText(value.label)).toBeInTheDocument();
      });
    });

    it('Should submit when inputs filled with the from', async () => {
      render(
         //isNew for add form inputs
        <Form isNew={true} />
      );
    
      const submitButton = screen.getByRole('button', { name: 'Submit' });
    
      formInputValues.forEach((mockValue, index) => {
        const input = screen.getByLabelText(mockValue.label);
        fireEvent.change(input, { target: { value: mockValue.correctTestValue } });
      });
      fireEvent.click(submitButton);

    });

    it('Should show no employees when there are no employees', async () => {
      render(
        <List employeeData={EmployeeDataEmpty}  /> );  
        const heading = screen.getByText(
          /No Employees Data.../i
      );
      expect(heading).toBeInTheDocument();
    });

    it('Should grid appear appear when data available', async () => {
      render(
        <List employeeData={MockEmployeeData}  /> );  
        const gridView = screen.getByTestId('grid-view');
        expect(gridView).toBeInTheDocument();
    });


    });

   

  
    




