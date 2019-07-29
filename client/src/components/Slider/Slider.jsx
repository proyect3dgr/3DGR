import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import AwsSliderStyles from "react-awesome-slider/src/styles";
import banner1 from "./banner1.png";
import banner2 from "./banner2.png";
import banner3 from "./banner3.png";
import banner4 from "./banner3.jpg";

export default class Slider extends Component {
  render() {
    return (
      <AwesomeSlider cssModule={AwsSliderStyles} className="slider">
        <div data-src={banner4} />
        <div data-src={banner1} />
        <div data-src={banner2} />
        <div data-src={banner3} />
      </AwesomeSlider>
    );
  }
}
