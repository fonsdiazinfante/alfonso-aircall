import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { BsTelephoneInbound, BsTelephoneOutbound } from "react-icons/bs";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/inbox.css';

const Inbox = ({calls, url, callUpdate}) => {

    async function unarchive(call_id){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_archived: false })
        };
        fetch(url + call_id, requestOptions)
            .then(response => response.json())
            .then(data => callUpdate(data));
    }

    return(
    <div>
        <Accordion>
        {calls.map(i => {
                if (calls.length > 0 && i.is_archived === true) {
                    return (
                        <Accordion.Item eventKey={i.id} key={i.id} >
                            <Accordion.Header> 
                                <Col xs={1}> {i.direction === 'outbound' ? 
                                <BsTelephoneOutbound />:<BsTelephoneInbound />} </Col>
                                <Col xs={2}>{i.call_type.charAt(0).toUpperCase()+ i.call_type.slice(1)}</Col> 
                                <Col xs={8} id="call_type">Call From: {i.from}</Col> </Accordion.Header>
                            <Accordion.Body id={i.call_type}> {/* ID here gives the accordion body it's color depending on if it's Answered, Missed or Voicemail*/}
                                <Row>
                                <Col xs={6}>Duration: {i.duration} minutes</Col>
                                <Col xs={4}>Via: {i.via}</Col>
                                <Col xs={6}>On: {Date(i.created_at)}</Col>

                                 
                                <Col xs={6}> {i.direction === 'outbound' ? "Calling:": "Call From:"} {i.to}</Col>               

                                </Row>
                                <Button variant="warning" onClick={() => unarchive(i.id)}>Unarchive</Button> 
                            </Accordion.Body>
                        </Accordion.Item>
                        
                    )
                } 
            }
        )}
        </Accordion>
    </div>
    )
};

export default Inbox;
