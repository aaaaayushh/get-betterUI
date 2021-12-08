import React, { useEffect, useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { FormContext } from "../../pages/GetBetter";

export default function PageOne({ nextStep }) {
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
          <Label for="self_employed">Are you self-employed?</Label>
          <Input
            type="select"
            name="self_employed"
            id="self_employed"
            value={state.self_employed}
            onChange={(e) => handleChange(e)}
          >
            <option>Yes</option>
            <option>No</option>
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
            <option>Yes</option>
            <option>No</option>
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
            <option>Yes</option>
            <option>No</option>
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
            <option>Never</option>
            <option>Rarely</option>
            <option>Sometimes</option>
            <option>Often</option>
            <option>NA</option>
          </Input>
        </FormGroup>
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
            <option>1-5</option>
            <option>6-25</option>
            <option>26-100</option>
            <option>100-500</option>
            <option>500-1000</option>
            <option>More than 1000</option>
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
