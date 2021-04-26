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

class App extends Component {

  state={
    userEmail:""
  }

  setUserEmail=(email)=>{
    this.setState({userEmail:email});
  }

  render()
  {
    console.log(this.state.userEmail);
    return (
      
      <div>
        <Switch>
        <Route
          path="/pastpapers"
          render={()=><Pastpapers userEmail={this.state.userEmail}/>}/>
        <Route
          path="/notes"
          render={()=><Notes userEmail={this.state.userEmail}/>}/>
         <Route
          path="/AdminHome"
          render={()=><AdminHome userEmail={this.state.userEmail}/>}/>
          <Route
          path="/Exam"
          render={()=><Exam userEmail={this.state.userEmail}/>}/>
          <Route
          path="/ExamEntrée"
          render={()=><ExamEntrée userEmail={this.state.userEmail}/>}/>
          <Route
          path="/MainExams"
          render={()=><Exams userEmail={this.state.userEmail}/>}/>

          <Route 
          path="/Homepage/Infopage/Editpage" 
          render={()=><EditProfile userEmail={this.state.userEmail}/>}/>

          <Route 
          path="/Homepage/Infopage" 
          render={()=><InfoProfile userEmail={this.state.userEmail}/>}/>

          <Route 
          path="/Homepage" 
          render={ ()=>{
            return <Home userEmail={this.state.userEmail}/>;}}/>

          <Route 
          path="/" 
          exact 
          render={()=><Guest email={this.state.userEmail} setUserEmail={(email)=>this.setUserEmail(email)}/>} />
          
        </Switch>
      </div>

    );
  }
  
}

export default App;
