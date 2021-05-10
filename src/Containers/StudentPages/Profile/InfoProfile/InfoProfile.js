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
        const idArray = [];
        console.log(JSON.parse(Cookies.get('user')).id)
        idArray.push(JSON.parse(Cookies.get('user')).id)
    
        const config = { 
            headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('user')).token}` } 
        };
        const res = await Axios.post("http://localhost:1234/User/Get?metadata=true", idArray, config);
        const profilePicRes = await Axios.get("http://localhost:1234/User/GetProfilePicture?userId="+JSON.parse(Cookies.get('user')).id);
        let responseObj = {
                id:res.data[0].id,
                name:res.data[0].name,
                // studyPlan:item.studyPlan.year,
                profilePic:profilePicRes.data===""?null: profilePicRes.data
            }
        this.setState({userInfo:{...responseObj}});
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
