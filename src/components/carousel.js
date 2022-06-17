import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default class Carousel extends React.Component {
  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
        isPlaying={true}
        interval={4000}
      >
            <Slider style={{height: '100%', width: '100%', backgroundColor: 'red', position: 'absolute'}}>
          <Slide index={0}>I am the first Slide.</Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
        </Slider>
         <div style={{ width: '80%', padding:20, backgroundColor: 'blue', position: 'relative'}} className="col-md-8 offset-2">portal</div>
      
      </CarouselProvider>
    );
  }
}