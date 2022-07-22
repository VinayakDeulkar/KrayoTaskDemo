import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Table, Navbar, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import myBucket from '../AwsConfig'
import { downloadFile, getfiles, uploadfile } from '../Config/awsService'
export default function Fileupload() {
    const [selectedFile, setselectedFile] = useState(null)
    const [UploadedData, setUploadedData] = useState([])
    const [Token, setToken] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('_token')))
        const data = JSON.parse(localStorage.getItem('_token'))
        getfiles(data)
            .then(response => {
                setUploadedData(response.data)
            })
    }, [])

    //Select File function
    const handleChange = (e) => {
        setselectedFile(e.target.files[0])
    }

    //Logout Function
    const Logout = () => {
        localStorage.removeItem('_token')
        window.open(`${process.env.REACT_APP_URL}auth/logout`, "_self")
    }

    const FileDownload = async (key) => {
        downloadFile({ dataKey: key })
            .then((res) => {
                const link = document.createElement('a');
                link.href = res.data.data;
                document.body.appendChild(link);
                link.click();
            })

    }
    //Logic for Uploading File
    const fileupload = async (event) => {
        event.preventDefault();
        let formData = new FormData()
        const data = JSON.parse(localStorage.getItem('_token'))
        formData.append('file', document.getElementById('file').files[0])
        formData.append('googleId', data.id)
        uploadfile(formData)
            .then((response) => {
                getfiles(data)
                    .then(res => {
                        setUploadedData(res.data)
                    })
                document.getElementById('file').value = ''
            })

    }
    return (
        <div>
            <Navbar bg='dark' expand='lg' className='text-light'>
                <Navbar.Brand className='text-light'> Krayo File Upload</Navbar.Brand>
                <Nav className='ms-auto me-3'>
                    <span className='p-2'>{Token?.email}</span>
                    <Button variant='dark' onClick={Logout}>LogOut</Button>
                </Nav>
            </Navbar>
            <Row className='m-1'>
                <Col lg={3} />
                <Col lg={6} className="mt-5 mb-5 text-center">
                    <Form onSubmit={fileupload} encType="multipart/form-data">
                        <Form.Control
                            type='file'
                            className='mb-3'
                            placeholder='Upload Here'
                            id="file"
                            onChange={handleChange}
                            name="file" />
                        <Button type='submit' variant='primary'>Upload File</Button>
                    </Form>
                </Col>
                <Col lg={3} />
            </Row>
            <Row className='ms-1 me-1 '>
                <h4 className='text-center'>Uploaded files By {Token?.email}</h4>
                <Col lg={12}>
                    <Table>
                        <thead>
                        </thead>
                        <tbody>
                            {UploadedData?.map((ele) =>
                                <tr key={ele}>
                                    <td onClick={() => FileDownload(ele)}>{ele}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}
