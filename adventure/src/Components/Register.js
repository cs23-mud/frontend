import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form``;
const Title = styled.h1``;
const Button = styled.button``;
const Input = styled.div``;
const Username = styled.input``;
const Password = styled.input``;
const Password2 = styled.input``;
const Container = styled.div``;
const SignUp = styled.div``;

const Register = props => {
  const [inputs, setInputs] = useState({
    password1: '',
    password2: '',
    username: ''
  });

  const registerUser = newUser => {
    axios
      .post(`https://cs23-mud.herokuapp.com/api/registration/`, newUser)
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
        <div>
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
        </div>
        <Button type='submit'>Sign up</Button>
      </Form>

      <SignUp>
        Already Sign up? <Link to='/'>Login Here</Link>
      </SignUp>
    </Container>
  );
};

export default Register;
