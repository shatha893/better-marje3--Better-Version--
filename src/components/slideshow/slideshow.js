import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Slideshow1 from '../../Assets/slideshow_1.PNG';
import Slideshow2 from '../../Assets/slideshow_2.PNG';
import Slideshow3 from '../../Assets/slideshow_3.PNG';

const slideshow = () => {
    return (
        <Carousel >
        <Carousel.Item interval={1100}>
          <img
            className="d-block w-100"
            src={Slideshow1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={1100}>
          <img
            className="d-block w-100"
            src={Slideshow2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Slideshow3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    )
}

export default slideshow;