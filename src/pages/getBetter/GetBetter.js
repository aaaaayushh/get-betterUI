import React, { useState } from "react";
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
  const [state, dispatch] = React.useReducer(reducer, initState);
  //   useEffect(() => {
  //     console.log(state);
  //   }, [state]);
  const prevStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  switch (step) {
    case 1:
      return (
        <FormContext.Provider value={{ state, dispatch }}>
          <PageOne nextStep={nextStep} />
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
