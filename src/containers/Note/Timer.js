import React from 'react'

//Stateful component for pages that re-render to root after CUD on notes.

class Timer extends React.Component {

    //Sets initial state with timer reference null as there is no timer to 
    //refer to, and initial amount of seconds to count down.

    state = {
      timer: null,
      secondsLeft: 10
    }

    //On mount, puts a variable pointing to the interval of tick () going off 
    //every second in the store inside timer so that it can be referenced for 
    //clearing later.

   componentDidMount(){
       let timer = setInterval(this.tick, 1000)
       this.setState({timer})
   }

   //Simply decreases number of seconds left on timer in local state by 1.

   tick = () => {
       this.setState({
           secondsLeft: this.state.secondsLeft-1
       })
    }

    //Stops the countdown from continuing to run when component unmounts.

    componentWillUnmount(){
        clearInterval(this.state.timer)
    }

   render(){
       return(
           <p>This page will re-render in {this.state.secondsLeft} seconds</p>
       )
   }
}
  
 export default Timer 