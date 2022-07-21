import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { CheckUser, loginCheck } from '../Config/awsService'

export default function SocialLogin() {
    const navigate = useNavigate()
    const checkLogin = () => {
        window.open(`${process.env.REACT_APP_URL}auth/google/callback`, "_self")
    }
    const getUser = async () => {
        try {
            console.log(localStorage.getItem('_token'));
            CheckUser()
                .then(response => {
                    console.log(response.data.user);
                    if (response.data.user && localStorage.getItem('_token') == undefined) {
                        localStorage.setItem('_token', JSON.stringify(response.data.user))
                        navigate('/fileUpload')
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getUser();
    }, [])

    return (
        <div>
            <Row className='ms-3 me-3'>
                <Col lg={3} />
                <Col lg={6} className='text-center'>
                    <h1>Welcome to Krayo </h1>
                    <Button onClick={checkLogin}>Login With Google</Button>
                </Col>
                <Col lg={3} />
            </Row>

        </div>
    )
}
