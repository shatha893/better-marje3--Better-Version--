import React, { Component } from 'react';
import ProfileUserInfo from '../../../../components/StudentComponents/profileUserInfo/profileUserInfo';
import Profile from '../Profile';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

class Infopage extends Component {

    state={
        userInfo:null
    }

    getUserData = async() =>{
        try{
        const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };
        const res = await Axios.get("http://localhost:1234/User/GetLoggedIn",config);
        const profilePic = await Axios.get("http://localhost:1234/User/GetProfilePicture?userId="+JSON.parse(Cookies.get('user')).id);
      
        let responseObj = {
                id:res.data.id,
                name:res.data.name,
                major:res.data.studyPlan.major.name,
                email:res.data.email,
                profilePic:profilePic.data===""?null: profilePic.data
            }
        this.setState({userInfo:{...responseObj}});
        }
        catch(error){
            console.log("Error = ",error);
        } 
    }

    componentDidMount(){ 
        this.getUserData();
    }

    handleEditClick=()=>{
        this.props.history.push("/Homepage/Editpage");
    }

    render(){

        return(
            <Profile>
                <ProfileUserInfo 
                profilePic={this.state.profilePic}
                type="info"
                userInfo={this.state.userInfo} 
                disable={true} 
                buttonText={"EDIT"}
                handleClicking={this.handleEditClick}/>
            </Profile>
            
        );
    }
}
export default withRouter(Infopage);
