import React, { useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FormContext } from "../../pages/getBetter/GetBetter";

export default function PageThree({ nextStep, prevStep }) {
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
          <Label for="seek_help">
            Does your employer provide resources to learn more about mental
            health issues and how to seek help?
          </Label>
          <Input
            type="select"
            value={state.seek_help}
            onChange={(e) => handleChange(e)}
            name="seek_help"
            id="seek_help"
          >
            <option value={2}>Yes</option>
            <option value={1}>No</option>
            <option value={0}>Don't Know</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="anonymity">
            Is your anonymity protected if you choose to take advantage of
            mental health or substance abuse treatment?
          </Label>
          <Input
            type="select"
            value={state.anonymity}
            onChange={(e) => handleChange(e)}
            name="anonymity"
            id="anonymity"
          >
            <option value={2}>Yes</option>
            <option value={1}>No</option>
            <option value={0}>Don't Know</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="leave">
            How easy is it for you to take medical leave for a mental health
            condition?
          </Label>
          <Input
            type="select"
            value={state.leave}
            onChange={(e) => handleChange(e)}
            name="leave"
            id="leave"
          >
            <option value={4}>Very easy</option>
            <option value={2}>Somewhat easy</option>
            <option value={1}>Somewhat difficult</option>
            <option value={3}>Very difficult</option>
            <option value={0}>Don't Know</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="mental_health_consequence">
            Do you think that discussing a mental health issue with your
            employer would have negative consequences?
          </Label>
          <Input
            type="select"
            value={state.mental_health_consequence}
            onChange={(e) => handleChange(e)}
            name="mental_health_consequence"
            id="mental_health_consequence"
          >
            <option value={2}>Yes</option>
            <option value={1}>No</option>
            <option value={0}>Maybe</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="phys_health_consequence">
            Do you think that discussing a physical health issue with your
            employer would have negative consequences?
          </Label>
          <Input
            type="select"
            value={state.phys_health_consequence}
            onChange={(e) => handleChange(e)}
            name="phys_health_consequence"
            id="phys_health_consequence"
          >
            <option value={2}>Yes</option>
            <option value={1}>No</option>
            <option value={0}>Maybe</option>
          </Input>
        </FormGroup>
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
            <option value={2}>Yes</option>
            <option value={0}>No</option>
            <option value={1}>Some of them</option>
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
