import React, { Component } from 'react';
import ProfileUserInfo from '../../../components/profileUserInfo/profileUserInfo';
import Profile from '../Profile';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

class Editpage extends Component {

    state={
        username:"",
        profilePic:"",
        email:"",
        major:"",
        mobileNum:"",
        studyPlan:"",
        password:""
    }

    componentDidMount(){
        
        Axios.get("http://localhost:3000/users?uniEmail="+this.props.userEmail)
        .then(
            response=>{
                    console.log(response);
                    this.setState({username:response.data[0].username,
                        profilePic:response.data[0].profilePic,
                        email:response.data[0].uniEmail,
                        major:response.data[0].major,
                        studyPlan:response.data[0].studyPlan,
                        phoneNum:response.data[0].phoneNum,
                        password:response.data[0].password})
                
        
            });
    }

    handleEditClick=()=>{
        this.props.history.push("/Homepage/Infopage");
    }

    render(){

        
        const userInfo = {...this.state};
        return(
            <Profile>
                <ProfileUserInfo 
                userInfo={userInfo} 
                disable={false} 
                buttonText={"SAVE"}
                handleClicking={this.handleEditClick}/>
            </Profile>
            
        );
    }
}
export default withRouter(Editpage);
