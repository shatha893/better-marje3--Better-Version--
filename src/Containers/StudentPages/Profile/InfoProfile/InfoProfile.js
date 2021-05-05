import React, { Component } from 'react';
import ProfileUserInfo from '../../../../components/StudentComponents/profileUserInfo/profileUserInfo';
import Profile from '../Profile';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class Infopage extends Component {

    state={
        // username:"",
        // profilePic:"",
        // email:"",
        // major:"",
        // studyPlan:"",
        // phoneNum:"",
        // password:""
        userInfo:[]
    }

    componentDidMount(){ 
        //How do I do this ????
    Axios.post("http://localhost:1234/User/Get",JSON.stringify(["1"]))
    .then((response) => {
        let tempArr = [];
        response.data.map((item,index)=>{
            tempArr.push({
                id:item.id,
                name:item.name,
                studyPlan:item.studyPlan.year
            })
        });
        this.setState({userInfo:[...tempArr]})
    });
        // Axios.get("http://localhost:3000/users?uniEmail="+this.props.userEmail)
        // .then(
        //     response=>{
        //         console.log(response);
        //         this.setState({username:response.data[0].username,
        //             profilePic:response.data[0].profilePic,
        //             email:response.data[0].uniEmail,
        //             major:response.data[0].major,
        //             studyPlan:response.data[0].studyPlan,
        //             phoneNum:response.data[0].phoneNum,
        //             password:response.data[0].password})
        //     }
        // )
    }

    handleEditClick=()=>{
        // this.props.history.push("/Homepage/Infopage/Editpage");
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
