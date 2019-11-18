import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login(props) {
    const [user, setUser] = useState({ username: "", password: "" })

    function inputHandler(event) {
        const updateduser = { ...user, [event.target.name] : event.target.value };
        setUser(updatedUser);
    }

    function submitHandler(event) {
        event.preventDefault();
        axios.post(`https://cs23-mud.herokuapp.com/api/login`, user)
        .then(res => {
            if (res.status === 200 && res.data) {
                const token = res.data.key
                localStorage.setItem('token', `Token ${token}`)
                props.history.push('/rooms')
            }
        })
        .catch(err => {
            if (err) console.log(err)
        })
    }

    return (

        <Container>
            <Header>
                <Title>MUD Adventure!</Title>
                <LoginPrompt>Please Login</LoginPrompt>
            </Header>

            <Form onSubmit={submitHandler}>

                <Username
                    type = "text"
                    id = "username"
                    name = "username" required
                    placeholder = "Username"
                    value = {user.username}
                    onChange = {inputHandler}
                />

                <Password
                    type = "password"
                    id = "password"
                    name = "password" required
                    placeholder = "Password"
                    value = {user.password}
                    onChange = {inputHandler}
                />

            </Form>

            <Signup> or Sign up <Link to = "/register">Here</Link></Signup>

        </Container>
    )
}

export default Login