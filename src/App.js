import React,{Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Guest from './Containers/StudentPages/Guest/Guest';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Containers/StudentPages/Home/Home';
import InfoProfile from './Containers/StudentPages/Profile/InfoProfile/InfoProfile';
import EditProfile from './Containers/StudentPages/Profile/EditProfile/EditProfile';
import Exams from './Containers/StudentPages/Exams/Exams';
import ExamEntrée from './Containers/StudentPages/ExamEntrée/ExamEntrée';
import Exam from './Containers/StudentPages/Exam/Exam';
import AdminHome from './Containers/AdminPages/Home/Home';
import Notes from './Containers/AdminPages/Notes/Notes';
import Pastpapers from './Containers/AdminPages/Pastpapers/Pastpapers';
import Feedback from './Containers/StudentPages/Feedback/Feedback';
import Question from './Containers/StudentPages/Question/Question';

class App extends Component {

  state={
    userEmail:""
  }

  setUserEmail=(email)=>{
    this.setState({userEmail:email});
  }

  render()
  {
    return (
      
      <div>
        <Switch>
        <Route
          path="/Question"
          render={()=><Question/>}/>
        <Route
          path="/Feedback"
          render={()=><Feedback/>}/>
        <Route
          path="/pastpapers"
          render={()=><Pastpapers/>}/>
        <Route
          path="/notes"
          render={()=><Notes/>}/>
         <Route
          path="/AdminHome"
          render={()=><AdminHome/>}/>
          <Route
          path="/Exam"
          render={()=><Exam/>}/>
          <Route
          path="/ExamEntrée"
          render={()=><ExamEntrée/>}/>
          <Route
          path="/MainExams"
          render={()=><Exams/>}/>

          <Route 
          path="/Homepage/Infopage/Editpage" 
          render={()=><EditProfile/>}/>

          <Route 
          path="/Homepage/Infopage" 
          render={()=><InfoProfile/>}/>

          <Route 
          // path="/Homepage" 
          path="/" 
          render={ ()=>{
            return <Home/>;}}/>

          <Route 
          // path="/" 
          exact 
          render={()=><Guest/>} />
          
        </Switch>
      </div>

    );
  }
  
}

export default App;
