import axios from 'axios';
import React, { useEffect } from 'react'
import { getToken } from '../../helpers';
import { Container, PageHeader } from 'react-bootstrap'
import { logout } from '../../helpers';

const PaymentSuccess = () => {
    const userToken = getToken();

    useEffect(() => {
        if (userToken) {
            axios.get(`http://localhost:4000/api/users/premium/${userToken._id}`)
                .then(res => {
                    console.log('you are premium');
                    logout();
                })
        }
    })
    return (
        <Container>
            <div className='message'>
                Welcome to Husky Premium!
                Re-login to start using your benefits!
            </div>;
        </Container>

    )
}

export default PaymentSuccess