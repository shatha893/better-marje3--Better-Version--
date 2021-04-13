import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './QuestionModal.module.css';

const questionModal = (props)=>(
      <Modal 
      show={props.show} 
      onHide={props.closeModal} 
      size="lg">

      <Modal.Header closeButton>
        <Modal.Title>Question View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
        {props.children}
        </Container>         
      </Modal.Body>

      </Modal>);

export default questionModal;