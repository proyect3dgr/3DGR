import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import AwsSliderStyles from "react-awesome-slider/src/styles";
import trailer from "./trailer.mp4";
import banner3 from "./banner3.jpg";

export default class Slider extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0
    };
  }

  setNextImage() {    
    let index = this.state.currentIndex + 1
    if (index === 2) index = 0;
    this.setState({ currentIndex: index  });
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setNextImage();
      }.bind(this),
      12000
    );
  }

  render() {
    // const startupScreen = (
    //   <div>
    //     <img src={loader} alt="loader" />
    //   </div>
    // );

    return (
      <AwesomeSlider
        selected={this.state.currentIndex}
        //startupScreen={startupScreen}
        cssModule={AwsSliderStyles}
        className="slider"
      >
        <div data-src={banner3} />
        
        <video data-src={trailer} autoPlay muted />

      </AwesomeSlider>
    );
  }
}
