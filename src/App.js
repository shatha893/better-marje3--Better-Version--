import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Guest from './Containers/StudentPages/Guest/Guest';
import Home from './Containers/StudentPages/Home/Home';
import InfoProfile from './Containers/StudentPages/Profile/InfoProfile/InfoProfile';
import EditProfile from './Containers/StudentPages/Profile/EditProfile/EditProfile';
import Exams from './Containers/StudentPages/Exams/Exams';
import ExamEntrée from './Containers/StudentPages/ExamEntrée/ExamEntrée';
import Exam from './Containers/StudentPages/Exam/Exam';
import AdminHome from './Containers/AdminPages/Home/Home';
import Notes from './Containers/AdminPages/PendingResource/Resources/notes';
import Pastpapers from './Containers/AdminPages/PendingResource/Resources/pastpapers';
import Feedback from './Containers/StudentPages/Feedback/Feedback';
import MainQuestion from './Containers/StudentPages/MainQuestion/MainQuestion';
import SubmitResource from './Containers/StudentPages/SubmitRersource/SubmitResource';
import Slides from './Containers/AdminPages/PendingResource/Resources/slides';
import Quizes from './Containers/AdminPages/PendingResource/Resources/quizes';
import Question from './Containers/StudentPages/Exams/ExamsTabs/QuestionsTab/Question/Question';
import AdminExams from './Containers/AdminPages/Exams/Exams';
import Cookies from 'js-cookie';

class App extends Component {
 
  render()
  {
    return (
      <Router>
      <div>
        <Switch>
        <Route
          path="/Exams"
          render={()=><AdminExams/>}/>
        <Route
          path="/Question"
          render={()=><Question/>}/>
        <Route
          path="/quizes"
          render={()=><Quizes/>}/>
        <Route
          path="/slides"
          render={()=><Slides/>}/>
        <Route
          path="/SubmitResource"
          render={()=><SubmitResource/>}/>
        <Route
          path="/Question"
          render={()=><MainQuestion/>}/>
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
        //  path="/"
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
          path="/Homepage/Infopage" 
          render={()=><InfoProfile/>}/>

          <Route 
          path="/Homepage/Editpage" 
          render={()=><EditProfile/>}/>
          
          <Route 
          path="/Homepage"
          render={ ()=>{
            return <Home />;}}/>

          <Route 
          path="/" 
          exact 
          render={()=><Guest/>} />
          
        </Switch>
      </div>
    </Router>
    );
  }
  
}

export default App;
