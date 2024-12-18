import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {Notyf} from 'notyf'; 

export default function EditCourse({ course, fetchData }) {

    const notyf = new Notyf();

    const [courseId, setCourseId] = useState(course._id);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    
    const [showEdit, setShowEdit] = useState(false);
    const openEdit = () => {
        setShowEdit(true);
        setName(course.name);
        setDescription(course.description);
        setPrice(course.price);
    }
    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice(0);
    }

    const editCourse = (e, courseId) => {
        e.preventDefault();
        fetch(`http://localhost:4000/courses/${courseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name, description, price
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true) {
                notyf.success('Successfully Updated');
                closeEdit();
                fetchData();
            } else {
                notyf.error('Something went wrong');
                closeEdit();
                fetchData();
            }
        })
    }

    return (
        <>
            <Button variant='primary' size='sm' onClick={() => openEdit()}>Edit</Button>
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editCourse(e, courseId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="courseName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' required value={name} onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="courseDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' required value={description} onChange={e => setDescription(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="coursePrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' required value={price} onChange={e => setPrice(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => closeEdit()}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
        
    )
}