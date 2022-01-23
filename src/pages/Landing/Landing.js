import React, { useEffect } from "react";
import Particles from "react-tsparticles";
import GraphOne from "../../components/LandingGraphs/graphOne.js";
import styles from "./Landing.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import GraphTwo from "../../components/LandingGraphs/graphTwo.js";
import GraphThree from "../../components/LandingGraphs/graphThree.js";

export default function Landing() {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  const particlesInit = (main) => {
    console.log(main);
  };
  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <>
      <div className={`${styles.snapScroll}`} dir="ltr">
        <div className="col-12">
          <div id={`${styles.container}`}>
            <div className={`${styles.left}`} />
            <Particles
              className={`${styles.tsParticles}`}
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                background: {
                  color: {
                    value: "#ffffff",
                  },
                  // position: "50% 50%",
                  repeat: "no-repeat",
                  size: "cover",
                },
                fullScreen: {
                  enable: false,
                },
                particles: {
                  color: {
                    value: [
                      "#5bc0eb",
                      "#fde74c",
                      "#9bc53d",
                      "#e55934",
                      "#fa7921",
                    ],
                  },
                  move: {
                    direction: "top",
                    enable: true,
                    outModes: {
                      bottom: "out",
                      left: "out",
                      right: "out",
                      top: "out",
                    },
                    speed: 5,
                  },
                  number: {
                    value: 30,
                  },
                  opacity: {
                    random: {
                      enable: true,
                      minimumValue: 0.4,
                    },
                    value: {
                      min: 0.4,
                      max: 0.8,
                    },
                    animation: {
                      speed: 1,
                      minimumValue: 0.1,
                    },
                  },
                  size: {
                    random: {
                      enable: true,
                      minimumValue: 300,
                    },
                    value: {
                      min: 100,
                      max: 200,
                    },
                    animation: {
                      enable: true,
                      speed: 100,
                      minimumValue: 300,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-evenly card shadow shadow-lg bg-secondary flex-row my-5 p-3 vh-100">
          <div className="col-10 mx-auto" data-aos="fade-left">
            <span className="fs-3 fw-bolder">
              As of 2017, an estimated 792 million people live with a mental
              health disorder, which is slightly more than one in ten people
              globally(10.7%).
            </span>
          </div>
          <div className="col-6 mx-auto d-flex flex-row align-items-center">
            <GraphOne />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-evenly card shadow shadow-lg bg-secondary flex-row my-5 p-3 vh-100">
          <div className="col-10 mx-auto" data-aos="fade-left">
            <span className="fs-2 fw-bolder">
              In 2017, an estimated 264 million people in the world experienced
              depression(it ranges mostly between 2%-6% of the world
              population).
            </span>
          </div>
          <div className="col-7 d-flex flex-row align-items-center mx-auto">
            <GraphTwo />
          </div>
        </div>
        <div className="d-flex col-12 ms-auto me-3 justify-content-evenly card shadow shadow-lg bg-secondary flex-row my-5 p-3 vh-100">
          <div className="col-6 my-auto" data-aos="fade-left">
            <span className="fs-2 fw-bolder">
              In 2017, an estimated 264 million people in the world experienced
              depression(it ranges mostly between 2%-6% of the world
              population).
            </span>
          </div>
          <div className="col-6 bg-white my-5">
            <GraphThree />
          </div>
        </div>
      </div>
    </>
  );
}
