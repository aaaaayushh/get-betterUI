import React, { useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FormContext } from "../../pages/getBetter/GetBetter";

export default function PageOne({ nextStep }) {
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
          <Label for ='age'>Select your age:</Label>
          <Input type='number' name='age' id='gender' value={state.age} onChange={(e)=>handleChange(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender:</Label>
          <Input type='select' name='gender' id='gender' value={state.gender} onChange={(e)=>handleChange(e)}>
            <option value={1}>Male</option>
            <option value={0}>Female</option>
            <option value={2}>Other</option>
          </Input>
          </FormGroup>
          <FormGroup>
          <Label for="self_employed">Are you self-employed?</Label>
          <Input
            type="select"
            name="self_employed"
            id="self_employed"
            value={state.self_employed}
            onChange={(e) => handleChange(e)}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="fam_history">
            Do you have a family history of mental illness?
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            type="select"
            name="fam_history"
            id="fam_history"
            value={state.fam_history}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="treatment">
            Have you sought treatment for a mental health condition?
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            type="select"
            name="treatment"
            id="treatment"
            value={state.treatment}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="work_interfere">
            If you have a mental health condition, do you feel that it
            interferes with your work?
          </Label>
          <Input
            onChange={(e) => handleChange(e)}
            type="select"
            name="work_interfere"
            id="work_interfere"
            value={state.work_interfere}
          >
            <option value={1}>Never</option>
            <option value={3}>Rarely</option>
            <option value={4}>Sometimes</option>
            <option value={2}>Often</option>
            <option value={0}>NA</option>
          </Input>
        </FormGroup>
        <div className="text-end">
          <Button color="primary" onClick={nextStep}>
            Next Page
          </Button>
        </div>
      </Form>
    </div>
  );
}
