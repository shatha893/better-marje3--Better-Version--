import React, {Component} from 'react';
import classes from './Clock.module.css';

class Clock extends Component{
 
   state={
      time:"",
      seconds:2000
   }
   timer = 0; 

   secondsToTime = (secs)=>{
      let hours = Math.floor(secs/(3600));

      let divisorForMins = secs%3600;
      let minutes = Math.floor(divisorForMins/60);

      let divisorForSecs = divisorForMins%60;
      let seconds = Math.ceil(divisorForSecs);

      let t = [hours, minutes, seconds];
      return t;
   }

   componentDidMount = ()=>{
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({time:timeLeftVar});
      this.startTimer();
   }

   startTimer =()=>{
      if(this.timer == 0 && this.state.seconds>0){
         this.timer = setInterval(this.countdown, 1000);
      }
   }

   countdown = () =>{
      // let obj = {"h":hours, "m":minutes, "s":seconds};
      const 
      takeTwelve = n => n > 12 ?  n  - 12 : n,
         addZero = n => n < 10 ? "0" +  n : n;

    	let d, h, m, s, t;
      
      d = this.state.seconds -1;
      let dObj = this.secondsToTime(d);
      h = addZero(takeTwelve(dObj[0])); 
      m = addZero(dObj[1]); 
      s = addZero(dObj[2]);
		  t = `${h}:${m}:${s}`;

      this.setState({
        time: t,
        seconds:d
      });

      if(this.state.seconds == 0) 
         clearInterval(this.timer);
   }
  
  
	render () {
  	return (
        <div className={classes.body}>
      <div className={classes.outer}>
        <div className={classes.inner}>
        <span className={
              this.state.time === "00:00:00" 
                ? classes.timeBlink 
                : classes.time}>
                {this.state.time}
            </span>
         
        </div>
      </div>
      </div>
    );
  }
}

export default Clock; 