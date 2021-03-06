import React, { useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FormContext } from "../../pages/getBetter/GetBetter";

export default function PageTwo({ nextStep, prevStep }) {
  const { state, dispatch } = useContext(FormContext);
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  return (
    <div className="card col-12 col-md-8 mx-auto shadow shadow-lg p-5 text-dark mt-5">
      <Form>
      <FormGroup>
          <Label for="no_employees">
            How many employees does your company or organisation have?
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            type="select"
            name="no_employees"
            id="no_employees"
            value={state.no_employees}
          >
            <option value={0}>1-5</option>
            <option value={4}>6-25</option>
            <option value={2}>26-100</option>
            <option value={1}>100-500</option>
            <option value={3}>500-1000</option>
            <option value={5}>More than 1000</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="remote_work">
            Do you work remotely at least 50% of the time?
          </Label>
          <Input
            type="select"
            name="remote_work"
            id="remote_work"
            value={state.remote_work}
            onChange={(e) => handleChange(e)}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="tech_company">
            Is your employer primarily a tech company/organisation?
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            type="select"
            name="tech_company"
            id="tech_company"
            value={state.tech_company}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="benefits">
            Does your employer provide mental health benefits?
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            type="select"
            name="benefits"
            id="benefits"
            value={state.benefits}
          >
            <option value={2}>Yes</option>
            <option value={1}>No</option>
            <option value={0}>Don't Know</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="care_options">
            Do you know the options for mental health care your employer
            provides?
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            type="select"
            name="care_options"
            id="care_options"
            value={state.care_options}
          >
            <option value={2}>Yes</option>
            <option value={0}>No</option>
            <option value={1}>Not Sure</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="wellness_program">
            Has your employer ever discussed mental health as part of an
            employee wellness program?
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            type="select"
            name="wellness_program"
            id="wellness_program"
            value={state.wellness_program}
          >
            <option value={2}>Yes</option>
            <option value={1}>No</option>
            <option value={0}>Don't Know</option>
          </Input>
        </FormGroup>
        <div className="d-flex justify-content-between">
          <Button color="primary" onClick={prevStep}>
            Previous Page
          </Button>
          <Button color="primary" onClick={nextStep}>
            Next Page
          </Button>
        </div>
      </Form>
    </div>
  );
}
