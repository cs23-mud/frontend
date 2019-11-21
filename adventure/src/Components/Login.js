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
const Header = styled.div`
`;
const Title = styled.h1``;
const Form = styled.form`
margin-bottom: 10px;
`;
const Username = styled.input`
margin: 0, 10px, 10px, 10px;
text-align: center;
padding: 10px;
border-radius: 5px;
border-color: black;
color: black;
font-weight: bold;
`;
const Password = styled.input`
margin: 10px;
text-align: center;
padding: 10px;
border-radius: 5px;
border-color: black;
color: black;
font-weight: bold;
`;
const Button = styled.button`
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
const SignUp = styled.div`
font-size: 12px;
color: black;
`;

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
      </Form>
      <Button type='submit'>Login</Button>
      <SignUp>
        {' '}
        or Sign up <Link to='/register'>Here</Link>
      </SignUp>
    </Container>
  );
}

export default Login;
