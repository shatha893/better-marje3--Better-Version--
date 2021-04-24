import React, { Component } from 'react';
import ProfileUserInfo from '../../../../components/StudentComponents/profileUserInfo/profileUserInfo';
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

    handleEditClick=(dataArr)=>{
        this.setState({
            username:dataArr[0],
            profilePic:dataArr[6],
            email:dataArr[1],
            major:dataArr[2],
            mobileNum:dataArr[3],
            studyPlan:dataArr[4],
            password:dataArr[5],
        });
        this.props.history.push("/Homepage/Infopage");
    }

    render(){

        
        const userInfo = {...this.state};
        return(
            <Profile>
                <ProfileUserInfo 
                type="edit"
                userInfo={userInfo} 
                disable={false} 
                buttonText={"SAVE"}
                handleClicking={this.handleEditClick}/>
            </Profile>
            
        );
    }
}
export default withRouter(Editpage);
