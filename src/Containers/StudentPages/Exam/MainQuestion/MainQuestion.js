import React, { Component } from 'react';


class MainQuestion extends Component{
  
   state={
       //Each question have to have a type so that we can choose the right view for it
      question:[{
         body:'what is the capital of the maldives?',
         Subquestions:[]
      }]
   };
   componentDidMount(){

      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');
      console.log(id);

      fetch('http://localhost:1234/ExamSubQuestion/Get', {
         method: 'POST',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([id])
      }).then(function(res){
         return res.json();
      }).then(function (data) {
         console.log(data);
         // Store the post data to a variable
              

         console.log(data[0].subQuestion);

     
        var arr=data[0].subQuestion.id;
         
         console.log(arr);

         // Fetch another API
return fetch('http://localhost:1234/SubQuestion​/Get', {
         method: 'POST',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([arr])
      });
      
      }).then(function (response) {
         if (response.ok) {
            return response.json();
         } else {
            return Promise.reject(response);
         }
      }).then(function (userData) {
         console.log(userData);
      }).catch(function (error) {
         console.warn(error);
      });
   
   }

   render(){
      return(
      <>
      </>
      );
   }
}

export default MainQuestion;
