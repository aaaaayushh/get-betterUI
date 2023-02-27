import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import PageOne from "../../components/form/PageOne";
import PageTwo from "../../components/form/PageTwo";
import PageThree from "../../components/form/PageThree";
import PageFour from "../../components/form/PageFour";

export const FormContext = React.createContext();
const initState = {
  age: 21,
  gender: 0,
  self_employed: 0,
  fam_history: 0,
  treatment: 0,
  work_interfere: 0,
  no_employees: 0,
  remote_work: 0,
  tech_company: 0,
  benefits: 0,
  care_options: 0,
  wellness_program: 0,
  seek_help: 0,
  anonymity: 0,
  leave: 0,
  mental_health_consequence: 0,
  phys_health_consequence: 0,
  coworkers: 0,
  supervisor: 0,
  mental_health_interview: 0,
  phys_health_interview: 0,
  mental_vs_physical: 0,
  obs_consequence: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "SUBMIT":
      const res = submitData(state);
      return res;
    default:
      return state;
  }
};
async function submitData(state) {
  // const res = await axios.post(`http://web-production-31a2.up.railway.app/user/mlData`,state);
  const mlData = Object.keys(state).map((key, index) => {
    return state[key];
  });
  console.log(mlData);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  };
  const res = await axios.post(
    "https://nkd3owrj4k.execute-api.ap-south-1.amazonaws.com/default/demoDocker",
    mlData,
    headers
  );
  console.log(res);
  return res;
}
export default function GetBetter() {
  const [step, setStep] = useState(1);
  const [modal, setModal] = useState(true);
  const [state, dispatch] = React.useReducer(reducer, initState);

  const prevStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  function toggle() {
    setModal(!modal);
  }

  switch (step) {
    case 1:
      return (
        <FormContext.Provider value={{ state, dispatch }}>
          <>
            <PageOne nextStep={nextStep} />
            <Modal isOpen={modal} size="lg" centered toggle={toggle}>
              <ModalHeader toggle={toggle} className="text-dark">
                Disclaimer
              </ModalHeader>
              <ModalBody>
                <div className="col-10 mx-auto text-dark fs-5 p-4">
                  I AM REALLY SORRY BUT I RAN OUT OF AWS CREDITS AND NOW THIS
                  MODEL DOESN'T WORK, PLEASE BEAR WITH ME WHILE I FIGURE
                  SOMETHING OUT. This is a preliminary model whose primary aim
                  is to evaluate whether it would be advisable for you to seek
                  medical help for your mental health issues given your current
                  employment status and health details. However, if the results
                  of this model do not seem satisfactory to you please ignore it
                  and seek whatever help is available to you.
                </div>
              </ModalBody>
            </Modal>
          </>
        </FormContext.Provider>
      );
    case 2:
      return (
        <FormContext.Provider value={{ state, dispatch }}>
          <PageTwo nextStep={nextStep} prevStep={prevStep} />;
        </FormContext.Provider>
      );
    case 3:
      return (
        <FormContext.Provider value={{ state, dispatch }}>
          <PageThree nextStep={nextStep} prevStep={prevStep} />;
        </FormContext.Provider>
      );
    case 4:
      return (
        <FormContext.Provider value={{ state, dispatch }}>
          <PageFour prevStep={prevStep} />;
        </FormContext.Provider>
      );
    default:
      <h1>default</h1>;
  }
}
