import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Slideshow1 from '../../Assets/slide_1.jpg';
import Slideshow2 from '../../Assets/slide_2.jpg';
import classes from './slideshow.module.css';

const slideshow = () => {
    return (
      <div className={classes.container}>
        <Carousel className={classes.carousel}>
        <Carousel.Item interval={2000}>
          <img
            src={Slideshow1}
            alt="First slide"
          />
          <Carousel.Caption className={classes.captionSlide2}>
            <h3>Notes & Pastpapers</h3>
            <p>awaiting you just with a click</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            src={Slideshow2}
            alt="Third slide"
          />
          <Carousel.Caption className={classes.captionSlide1}>
            <h3>Computerized Exams</h3>
            <p>That will help you ace all your exams</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
    )
}

export default slideshow;