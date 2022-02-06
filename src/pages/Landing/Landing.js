import React, { useEffect } from "react";
import Particles from "react-tsparticles";
import GraphOne from "../../components/LandingGraphs/graphOne.js";
import styles from "./Landing.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import GraphTwo from "../../components/LandingGraphs/graphTwo.js";

export default function Landing() {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  const particlesInit = (main) => {
    // console.log(main);
  };
  const particlesLoaded = (container) => {
    // console.log(container);
  };
  return (
    <>
      <div className={`${styles.snapScroll}`} dir="ltr">
        <div className="col-12">
          <div id={`${styles.container}`}>
            <div
              className={`${styles.left} d-flex justify-content-center`}
            ></div>
            <img
              src="/temp.png"
              alt="cover"
              className={`img-fluid ${styles.coverImg}`}
            />
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
                  enable: true,
                  zIndex: -1,
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
        <div
          style={{ minHeight: "50em" }}
          className="d-flex flex-column justify-content-center justify-content-md-evenly card shadow shadow-lg bg-secondary flex-row my-lg-5 p-3 vh-100"
        >
          <div className="col-12 col-md-8 mx-auto" data-aos="fade-left">
            <span className="fs-2 fw-bolder d-none d-lg-block">
              As of 2017, an estimated 792 million people live with a mental
              health disorder, which is slightly more than one in ten people
              globally(10.7%).
            </span>
            <span className="fs-4 fw-bolder d-block d-lg-none">
              As of 2017, an estimated 792 million people live with a mental
              health disorder, which is slightly more than one in ten people
              globally(10.7%).
            </span>
          </div>
          <div className="col-12 col-md-6 mx-auto d-flex flex-row align-items-start">
            <GraphOne />
          </div>
        </div>
        <div
          style={{ minHeight: "50em" }}
          className="d-flex flex-column justify-content-center justify-content-md-evenly card shadow shadow-lg bg-secondary flex-row my-lg-5 p-3 vh-100"
        >
          <div
            className="col-12 col-md-10 mx-auto mb-5 mb-md-0"
            data-aos="fade-left"
          >
            <span className="fs-2 fw-bolder d-none d-lg-block">
              In 2017, an estimated 264 million people in the world experienced
              depression(it ranges mostly between 2%-6% of the world
              population).
            </span>
            <span className="fs-4 fw-bolder d-block d-lg-none">
              In 2017, an estimated 264 million people in the world experienced
              depression(it ranges mostly between 2%-6% of the world
              population).
            </span>
          </div>
          <div className="col-12 col-md-7 d-flex flex-row align-items-center mx-auto">
            <GraphTwo />
          </div>
        </div>
        <div className="col-12 ms-auto me-3 card shadow shadow-lg bg-secondary my-lg-5 p-3">
          <span className="d-none d-lg-block fs-3 my-auto fw-bolder">
            In the age of social media, taking care of one's mental health has
            never been more important. As the social media space has grown, so
            have the snares of mental health conditions.
            <br />
            <br />
            Social media use has proved particularly detrimental to adolescents
            and young adults. The rate of adolescents reporting symptoms of
            major depression in a given year increased by 52% from 2005 to 2017.
            From 2009 to 2017, it grew 63% in adults aged 18 to 25.
            <br />
            <br />
            Putting this together with the taboo mental health diseases carry
            with them, it is astounding that no single solution exists for this
            problem. This personal project of mine is more of a demo for the
            vision I have of one day building a social media application that
            caters to the necessities and needs of those affected by various
            mental health diseases.
            <br />
            <br />
            Apart from the social media aspect of this project, I've also added
            an additional "Get Better" feature that tells the user if they
            should/should not seek medical attention based on various
            parameters.(Currently, this feature caters only to the working
            population of the technology sector, but I plan to add additional
            groups in the future as well).
          </span>
          <span className="d-block d-lg-none fs-6 fw-bolder">
            In the age of social media, taking care of one's mental health has
            never been more important. As the social media space has grown, so
            have the snares of mental health conditions.
            <br />
            <br />
            Social media use has proved particularly detrimental to adolescents
            and young adults. The rate of adolescents reporting symptoms of
            major depression in a given year increased by 52% from 2005 to 2017.
            From 2009 to 2017, it grew 63% in adults aged 18 to 25.
            <br />
            <br />
            Putting this together with the taboo mental health diseases carry
            with them, it is astounding that no single solution exists for this
            problem. This personal project of mine is more of a demo for the
            vision I have of one day building a social media application that
            caters to the necessities and needs of those affected by various
            mental health diseases.
            <br />
            <br />
            Apart from the social media aspect of this project, I've also added
            an additional "Get Better" feature that tells the user if they
            should/should not seek medical attention based on various
            parameters.(Currently, this feature caters only to the working
            population of the technology sector, but I plan to add additional
            groups in the future as well).
          </span>
        </div>
      </div>
    </>
  );
}
