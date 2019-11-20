import React, { useState } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Container = styled.div``;
const Header = styled.div``;
const Title = styled.h1``;
const NorthButton = styled.button`
  display: block;
  margin: 0 auto 20px;
`;
const SouthButton = styled.button`
  display: block;
  margin: 20px auto 0;
`;

class World extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem('token');
    this.state = {
      title: '',
      description: '',
      error_msg: ''
    };
  }

  componentDidMount() {
    axiosWithAuth(this.token)
      .get(`https://cs23-mud.herokuapp.com/api/adv/init/`)
      .then(res => {
        console.log(res.data);
        const currentRoom = res.data;
        this.setState({
          title: currentRoom.title,
          description: currentRoom.description,
          error_msg: currentRoom.error_msg
        });
      })
      .catch(err => {
        if (err) console.log(err);
      });
  }
  submitMove(direction) {
    axiosWithAuth(this.token)
      .post(`https://cs23-mud.herokuapp.com/api/adv/move/`, { direction })
      .then(res => {
        console.log(res.data);
        const currentRoom = res.data;
        this.setState({
          title: currentRoom.title,
          description: currentRoom.description,
          error_msg: currentRoom.error_msg
        });
      })
      .catch(err => {
        if (err) console.log(err);
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>MUD Adventure!</Title>
        </Header>

        <NorthButton onClick={() => this.submitMove('n')}>
          Head North
        </NorthButton>
        <Container style={{ display: 'flex' }}>
          <button onClick={() => this.submitMove('w')}>Head West</button>
          <Container style={{ margin: '0 auto' }}>
            <p>{this.state.title || ''}</p>
            <p>{this.state.description || 'Loading...'}</p>
            <p>{this.state.error_msg || ''}</p>
          </Container>
          <button onClick={() => this.submitMove('e')}>Head East</button>
        </Container>
        <SouthButton onClick={() => this.submitMove('s')}>
          Head South
        </SouthButton>
      </Container>
    );
  }
}

export default World;
