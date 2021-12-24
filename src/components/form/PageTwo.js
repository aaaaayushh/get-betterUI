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
    <div className="card col-8 mx-auto shadow shadow-lg p-5">
      <Form>
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
            <option value="Yes">Yes</option>
            <option value="No">No</option>
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
            <option>Yes</option>
            <option>No</option>
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
            <option>Yes</option>
            <option>No</option>
            <option>Don't Know</option>
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
            <option>Yes</option>
            <option>No</option>
            <option>Not Sure</option>
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
            <option>Yes</option>
            <option>No</option>
            <option>Don't Know</option>
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
