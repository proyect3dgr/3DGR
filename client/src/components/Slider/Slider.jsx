import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import AwsSliderStyles from "react-awesome-slider/src/styles";
import banner1 from "./banner1.png";
import banner2 from "./banner2.png";
import banner3 from "./banner3.png";
import banner4 from "./banner3.jpg";
import loader from "./loader.jpg";

export default class Slider extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0
    };
  }

  setNextImage() {
    // setState method is used to update the state
    
    let index = this.state.currentIndex + 1
    console.log(index+"soy index cucucuccucuccu")
    if (index === 4) index = 0;
    this.setState({ currentIndex: index  });
  }

  componentDidMount() {
    setInterval(
      function() {
        console.log("<--------");
        this.setNextImage();
      }.bind(this),
      5000
    );
  }

  render() {
    const startupScreen = (
      <div>
        <img src={loader} alt="loader" />
      </div>
    );

    return (
      <AwesomeSlider
        selected={this.state.currentIndex}
        //startupScreen={startupScreen}
        cssModule={AwsSliderStyles}
        className="slider"
      >
        <div data-src={banner4} />
        <div data-src={banner1} />
        <div data-src={banner2} />
        <div data-src={banner3} />
      </AwesomeSlider>
    );
  }
}
