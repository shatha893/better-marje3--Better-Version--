import React, { Component } from 'react';
import ProfileUserInfo from '../../../../components/StudentComponents/profileUserInfo/profileUserInfo';
import Profile from '../Profile';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

class Editpage extends Component {

    state={
        userInfo:{
            id:0,
            name:"",
            major:"",
            password:""
        }
       
    }

    componentDidMount = ()=>{
        const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };
        Axios.get("http://localhost:1234/User/GetLoggedIn",config).then(res=>{
            let responseObj = {
                id:res.data.id,
                name:res.data.name,
                major:res.data.studyPlan.major.name
            }
        this.setState({userInfo:{...responseObj}});
        })
    }
    
    handleSaveClick= async(newData)=>{
        let picbase64 = null;
        if(newData.profilePic !== null)
       {
           let tempPicSplitted = newData.profilePic.split(',');
           picbase64 = tempPicSplitted[1];
    }
        const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };
        console.log("....",newData);
        Axios.patch("http://localhost:1234/User/Update",{
            "id": JSON.parse(Cookies.get('user')).id,
            "isAdmin": false,
            "password":newData.password,
            "profilePictureJpgBase64": picbase64,
            "name": newData.username
          }, config)
          .then(res =>{
              console.log("res",res);
            this.props.history.push("/Homepage/Infopage") })
          .catch(error =>this.props.history.push("/Homepage/Infopage"));
        
    }

    render(){
        return(
            <Profile>
                <ProfileUserInfo 
                type="edit"
                userInfo={this.state.userInfo} 
                disable={false} 
                buttonText={"SAVE"}
                handleClicking={(newData)=>this.handleSaveClick(newData)}/>
            </Profile>
            
        );
    }
}
export default withRouter(Editpage);
