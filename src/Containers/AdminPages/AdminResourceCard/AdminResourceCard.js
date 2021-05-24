import React,{ Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import classes from './AdminResourceCard.module.css';
import Axios from 'axios';

class AdminResourceCard extends Component{

   state={
      openSnackbar:false,
      snackbarMessage:""
   }

   handleApprove = () =>{
      Axios.patch('http://localhost:1234/Resource/Update',{
         "id": this.props.resourceId,
         "isApproved": true
       })
       .then(res=>
         {this.setState({openSnackbar:true,snackbarMessage:"Resource Approved"});
      })
      .catch(error=>{
         console.log(error);
         this.setState({openSnackbar:true,snackbarMessage:"Something Went Wrong :("})
      });
   }

   handleDelete = () =>{
      Axios.delete('http://localhost:1234/Resource/Delete',this.props.resourceId)
      .then(res => {
          console.log(res);
         this.setState({openSnackbar:true,snackbarMessage:"Resource Deleted"});
       })
      .catch(error=>{
         console.log(error);
         this.setState({openSnackbar:true,snackbarMessage:"Something Went Wrong :("});
      })
   }

   handleCloseSnackbar = ()=>{
      this.setState({openSnackbar:false});
  }

   render(){
      return(
         <>
         <Card 
         className={classes.content}>
             <Card.Img variant="top" src={this.props.image} />
             <Card.Body className={classes.card}>
                 <Card.Title>{this.props.title}</Card.Title>
                 <Card.Text>
                     {this.props.description.course} <br/>
                     {this.props.description.author} <br/>
                     {this.props.description.creationDate} <br/>
                 </Card.Text>
                 <div><a 
                 href={`http://localhost:1234/Resource/GetResourceFile?resourceId=${this.props.resourceId}`}
                 className={classes.anchor}>Download Me!</a>
                 </div>
                 <Button 
                 className={classes.deleteButton}
                 variant="danger"
                 onClick={this.handleDelete}> Delete </Button>
 
                 <Button 
                 className={classes.approveButton}
                 variant="success"
                 onClick={this.handleApprove}> Approve </Button>
             </Card.Body>
         </Card>
         <Snackbar
         anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'left',
         }}
         open={this.state.openSnackbar}
         autoHideDuration={10000}
         onClose={this.handleCloseSnackbar}
         message={`${this.state.snackbarMessage}`}
         action={
         <React.Fragment>
             <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                 <CloseIcon fontSize="small" />
             </IconButton>
         </React.Fragment>}/>
         </>
     );
   }  
}

export default AdminResourceCard;