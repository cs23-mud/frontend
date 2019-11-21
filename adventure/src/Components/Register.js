import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const Form = styled.form`
margin-bottom: 10px;
justify-content: center;
`;
const Title = styled.h1``;
const Button = styled.button`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
padding: 10px 20px 10px 20px;
border-radius: 5px;
border-color: black;
border-width: 2px;
text-align: center;
font-weight: bolder;
background: grey;
font-size: 17px;
margin-bottom: 20px;
`;
const Input = styled.div``;
const Username = styled.input`
text-align: center;
padding: 10px;
border-radius: 5px;
border-color: black;
color: black;
font-weight: bold;
margin-bottom: 10px;
`;
const Password = styled.input`
text-align: center;
padding: 10px;
border-radius: 5px;
border-color: black;
color: black;
font-weight: bold;
margin-bottom: 10px;
`;
const Password2 = styled.input`
text-align: center;
padding: 10px;
border-radius: 5px;
border-color: black;
color: black;
font-weight: bold;
margin-bottom: 10px;
`;
const Text = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`
const SignUp = styled.div`
font-size: 12px;
color: black;
`;

// Change to http://127.0.0.1:8000 for local testing, https://cs23-mud.herokuapp.com for deployed server
const baseURL = 'https://cs23-mud.herokuapp.com';

const Register = props => {
  const [inputs, setInputs] = useState({
    password1: '',
    password2: '',
    username: ''
  });

  const registerUser = newUser => {
    axios
      .post(`${baseURL}/api/registration/`, newUser)
      .then(res => {
        console.log('response', res);
        const token = res.data.key;
        localStorage.setItem('token', `Token ${token}`);
        props.history.push('/');
      })
      .catch(error => {
        console.log('ERROR', error.response);
      });
  };

  const handleSubmit = event => {
    console.log('UserState:', inputs);
    if (event) {
      event.preventDefault();
      registerUser(inputs);
    }
  };

  const handleChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Create an Account</Title>
        <Text>
          <Input>
            <Username
              placeholder='Username'
              type='username'
              name='username'
              onChange={handleChange}
              value={inputs.username}
              required
            />
          </Input>

          <Input>
            <Password
              placeholder='Password'
              type='password1'
              name='password1'
              onChange={handleChange}
              value={inputs.password1}
              required
            />
          </Input>

          <Input>
            <Password2
              placeholder='Confirm Password'
              type='password2'
              name='password2'
              onChange={handleChange}
              value={inputs.password2}
              required
            />
          </Input>
        </Text>
      </Form>
      <Button type='submit'>Sign up</Button>
      <SignUp>
        Already Sign up? <Link to='/'>Login Here</Link>
      </SignUp>
    </Container>
  );
};

export default Register;
