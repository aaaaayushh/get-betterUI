import React from "react";
import Particles from "react-tsparticles";
import GraphOne from "../../components/LandingGraphs/graphOne.js";
import styles from "./Landing.module.css";

export default function Landing() {
  const particlesInit = (main) => {
    console.log(main);
  };
  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <>
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
      <div className="container">
        <div className="col-6">
          <GraphOne />
        </div>
      </div>
    </>
  );
}
