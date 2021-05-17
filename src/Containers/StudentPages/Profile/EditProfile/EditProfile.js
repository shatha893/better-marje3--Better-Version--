import React, { Component } from 'react';
import ProfileUserInfo from '../../../../components/StudentComponents/profileUserInfo/profileUserInfo';
import Profile from '../Profile';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

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

    
    handleSaveClick= async(newData)=>{
        console.log("newData -->",newData,"---",newData.profilePic.substr(23,newData.profilePic.length));
        const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };
        const res = await Axios.patch("http://localhost:1234/User/Update",{
            "id": JSON.parse(Cookies.get('user')).id,
            "isAdmin": false,
            "password":newData.password,
            "profilePictureJpgBase64": newData.profilePic.substr(23,newData.profilePic.length),
            "studyPlanId": null,
            "name": newData.username
          }, config);
          console.log(res);
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
                handleClicking={(newData)=>this.handleSaveClick(newData)}/>
            </Profile>
            
        );
    }
}
export default withRouter(Editpage);
