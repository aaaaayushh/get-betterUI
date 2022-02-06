import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PageOne from "../../components/form/PageOne";
import PageTwo from "../../components/form/PageTwo";
import PageThree from "../../components/form/PageThree";
import PageFour from "../../components/form/PageFour";

export const FormContext = React.createContext();
const initState = {
  self_employed: "No",
  fam_history: "No",
  treatment: "No",
  work_interfere: "Never",
  no_employees: "1-5",
  remote_work: "No",
  tech_company: "Yes",
  benefits: "Don't Know",
  care_options: "Not Sure",
  wellness_program: "Don't Know",
  seek_help: "Don't Know",
  anonymity: "Don't Know",
  leave: "Don't Know",
  mental_health_consequence: "No",
  phys_health_consequence: "No",
  coworkers: "No",
  supervisor: "No",
  mental_health_interview: "No",
  phys_health_interview: "No",
  mental_vs_physical: "Don't Know",
  obs_consequence: "No",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "SUBMIT":
      console.log(state);
      return state;
    default:
      return state;
  }
};
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
                  This is a preliminary model whose primary aim is to evaluate
                  whether it would be advisable for you to seek medical help for
                  your mental health issues given your current employment status
                  and health details. However, if the results of this model do
                  not seem satisfactory to you please ignore it and seek
                  whatever help is available to you.
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
