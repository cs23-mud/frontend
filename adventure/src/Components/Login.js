import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;
const Header = styled.div``;
const Title = styled.h1``;
const LoginPrompt = styled.span``;
const Form = styled.form``;
const Username = styled.input``;
const Password = styled.input``;
const Button = styled.button``;
const SignUp = styled.div``;

// Change to http://127.0.0.1:8000 for local testing, https://cs23-mud.herokuapp.com for deployed server
const baseURL = 'https://cs23-mud.herokuapp.com';

function Login(props) {
  const [user, setUser] = useState({ username: '', password: '' });

  function inputHandler(event) {
    const updatedUser = { ...user, [event.target.name]: event.target.value };
    setUser(updatedUser);
  }

  function submitHandler(event) {
    event.preventDefault();
    axios
      .post(`${baseURL}/api/login/`, user)
      .then(res => {
        if (res.status === 200 && res.data) {
          const token = res.data.key;
          localStorage.setItem('token', `Token ${token}`);
          props.history.push('/world');
        }
      })
      .catch(err => {
        if (err) console.log(err);
      });
  }

  return (
    <Container>
      <Header>
        <Title>MUD Adventure!</Title>
        <LoginPrompt>Please Login</LoginPrompt>
      </Header>

      <Form onSubmit={submitHandler}>
        <Username
          type='text'
          id='username'
          name='username'
          required
          placeholder='Username'
          value={user.username}
          onChange={inputHandler}
        />

        <Password
          type='password'
          id='password'
          name='password'
          required
          placeholder='Password'
          value={user.password}
          onChange={inputHandler}
        />
        <Button type='submit'>Submit</Button>
      </Form>

      <SignUp>
        {' '}
        or Sign up <Link to='/register'>Here</Link>
      </SignUp>
    </Container>
  );
}

export default Login;
