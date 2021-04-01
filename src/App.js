import React,{Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Guest from './Containers/Guest/Guest';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Containers/Home/Home';
import InfoProfile from './Containers/Profile/InfoProfile/InfoProfile';
import EditProfile from './Containers/Profile/EditProfile/EditProfile';
import Exams from './Containers/Exams/Exams';

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
