import React from 'react'
import { Col, Row } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'

export default function SocialLogin() {
    const navigate = useNavigate()
    const responseGoogle = (response) => {
        localStorage.setItem('_token', JSON.stringify(response.profileObj))
        navigate('/fileUpload')
    }
    const LoginFailed = (response) => {
        alert('Unable to Login')
    }
    return (
        <div>
            <Row className='ms-3 me-3'>
                <Col lg={3} />
                <Col lg={6} className='text-center'>
                    <h1>Welcome to Krayo </h1>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLEID}
                        buttonText="Sign In With Google"
                        onSuccess={responseGoogle}
                        onFailure={LoginFailed}
                        cookiePolicy={'single_host_origin'}
                    />
                </Col>
                <Col lg={3} />
            </Row>

        </div>
    )
}
