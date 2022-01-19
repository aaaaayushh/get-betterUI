import React, { useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FormContext } from "../../pages/getBetter/GetBetter";

export default function PageFour({ prevStep }) {
  const { state, dispatch } = useContext(FormContext);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    dispatch({
      type: "SUBMIT",
    });
  };
  return (
    <div className="card col-8 mx-auto shadow shadow-lg p-5 text-dark mt-5">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label for="coworkers">
            Would you be willing to discuss a mental health issue with your
            coworkers?
          </Label>
          <Input
            type="select"
            value={state.coworkers}
            onChange={(e) => handleChange(e)}
            name="coworkers"
            id="coworkers"
          >
            <option>Yes</option>
            <option>No</option>
            <option>Some of them</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="supervisor">
            Would you be willing to discuss a mental health issue with your
            direct supervisor(s)?
          </Label>
          <Input
            type="select"
            value={state.supervisor}
            onChange={(e) => handleChange(e)}
            name="supervisor"
            id="supervisor"
          >
            <option>Yes</option>
            <option>No</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="mental_health_interview">
            Would you bring up a mental health issue with a potential employer
            in an interview?
          </Label>
          <Input
            type="select"
            value={state.mental_health_interview}
            onChange={(e) => handleChange(e)}
            name="mental_health_interview"
            id="mental_health_interview"
          >
            <option>Yes</option>
            <option>No</option>
            <option>Maybe</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="phys_health_interview">
            Would you be willing to discuss a physical health issue with your
            interview?
          </Label>
          <Input
            type="select"
            value={state.phys_health_interview}
            onChange={(e) => handleChange(e)}
            name="phys_health_interview"
            id="phys_health_interview"
          >
            <option>Yes</option>
            <option>No</option>
            <option>Maybe</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="mental_vs_physical">
            Do you feel that your employer takes mental health as seriously as
            physical health?
          </Label>
          <Input
            type="select"
            value={state.mental_vs_physical}
            onChange={(e) => handleChange(e)}
            name="mental_vs_physical"
            id="mental_vs_physical"
          >
            <option>Yes</option>
            <option>No</option>
            <option>Don't know</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="obs_consequence">
            Have you heard of or observed negative consequences for coworkers
            with mental health conditions in your workplace?
          </Label>
          <Input
            type="select"
            value={state.obs_consequence}
            onChange={(e) => handleChange(e)}
            name="obs_consequence"
            id="obs_consequence"
          >
            <option>Yes</option>
            <option>No</option>
          </Input>
        </FormGroup>

        <div className="d-flex justify-content-between">
          <Button color="primary" onClick={prevStep}>
            Previous Page
          </Button>
          <Button type="submit" color="success">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
