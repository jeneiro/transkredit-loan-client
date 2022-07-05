import React from "react";
import "./component.css";

import slide1 from "../assets/slideBG.jpg";
import slide2 from "../assets/slideBG2.jpg";
import slide3 from "../assets/slideBG3.jpg";
import { useNavigate } from "react-router-dom";

import {
  CarouselProvider,
  Slider,
  Slide,
 
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
export default function Registration() {
  const navigate = useNavigate();
  return (
    <div style={{backgroundColor:"#061829"}}>
      <div
        className="banner"
        style={{ color: "#ffffff", paddingTop: "100px", paddingLeft: "40px" }}
      >
        <h4>
          <b>
            <i>Welcome</i>
          </b>
        </h4>
        <b>
          <i>Select registration mode</i>
        </b>
        <br />
      </div>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={35}
        totalSlides={3}
        isPlaying={true}
        interval={4000}
      >
        <Slider style={{ width: "100%", position: "absolute", marginTop: -30, minHeight: 700}}>
          <Slide index={0}>
            {" "}
            <img
              style={{ zIndex: -1, position: "absolute" }}
              src={slide1}
              alt=""
              width={"100%"}
            />
            <div
              style={{
                color: "white",
                float: "right",
                marginTop: 130,
                paddingRight: 50,
              }}
              className="sliderTXT"

            >
              <h1>Access Loans In Minutes</h1>
              <h5 style={{ marginTop: 15, textAlign: "justifyContent" }}>
                Gaining access to funds does not have to be so difficult.
                <br />
                Please This is why we ensure a swift and easy application
                process.
              </h5>
            </div>
          </Slide>
          <Slide index={1}>
            {" "}
            <img
              style={{ zIndex: -1, position: "absolute" }}
              src={slide2}
              alt=""
              width={"100%"}
            />
            <div style={{ color: "white", marginTop: 130,  textAlign:"center" }} className="sliderTXT">
              <h1>Consumer Loans</h1>
              <h5 style={{ marginTop: 15, textAlign: "justifyContent" }}>
              Transkredit provides consumer lending services that are focused  <br /> mainly on individual and household consumers. The consumer loans <br /> we provide may be secured or unsecured,  <br /> depending on the amount   to be borrowed and the type of product  <br /> to be purchased.
                <br />
                
              </h5>
            </div>
          </Slide>

          <Slide index={2}>
            {" "}
            <img
              style={{ zIndex: -1, position: "absolute" }}
              src={slide3}
              alt=""
              width={"100%"}
            />
            <div style={{ color: "white", marginTop: 130, marginLeft:50, textAlign:"left" }} className="sliderTXT">
              <h1>Cooperative Loans</h1>
              <h5 style={{ marginTop: 15, textAlign: "justifyContent" }}>
              Transkredit provides a platform for <br /> Cooperatives and its members easy access to loans. Transkredit Loan Portal <br /> affords, a customer-friendly approach  <br /> 
                
              </h5>
            </div>
          </Slide>
        </Slider>
        <div
          className="row"
          style={{
           
            paddingLeft: 40,
            paddingRight: 40,
            marginTop: 30,
            zIndex: 2,
          }}
        >
          <div
            class="box box-2 col-md-4 "
            style={{marginBottom:5}}
            onClick={() => {
              navigate("/app/Individual-registration");
            }}
          >
            <button type="button" className="btn-2">
              Individual Account
            </button>
          </div>
          <div
            class="box box-2 col-md-4"
            style={{marginBottom:5}}
            onClick={() => {
              navigate("/app/register-via-corporative");
            }}
          >
            <button type="button" className="btn-2">
              Join Through Cooperative
            </button>
          </div>
          <div
            class="box box-2 col-md-4"
            style={{marginBottom:5}}
            onClick={() => {
              navigate("/app/corporate-registration");
            }}
          >
            <button type="button" className=" btn-2">
              Cooperative/Corporate Account
            </button>
          </div>
         
        </div>
      </CarouselProvider>

    
    </div>
  );
}
