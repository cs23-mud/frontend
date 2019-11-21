import React from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import vertPath from '../assets/vertical-path.png';
import horizPath from '../assets/horizontal-path.png';
import wall from '../assets/wall.png';
import whitespaceFiller from '../assets/whitespace.png';
import hero from '../assets/hero.png';
import room from '../assets/rooms.png';

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

// Change to http://127.0.0.1:8000 for local testing, https://cs23-mud.herokuapp.com for deployed server
const baseURL = 'https://cs23-mud.herokuapp.com';

class World extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem('token');
    this.state = {
      mapOpen: false,
      roomId: '',
      title: '',
      description: '',
      error_msg: '',
      world: ''
    };
  }

  componentDidMount() {
    axiosWithAuth(this.token)
      .get(`${baseURL}/api/adv/init/`)
      .then(res => {
        console.log(res.data);
        const currentRoom = res.data;
        this.setState({
          title: currentRoom.title,
          description: currentRoom.description,
          error_msg: currentRoom.error_msg
        });
        console.log(this.state.world);
      })
      .catch(err => {
        if (err) console.log(err);
      });
  }

  submitMove(direction) {
    axiosWithAuth(this.token)
      .post(`${baseURL}/api/adv/move/`, { direction })
      .then(res => {
        console.log(res.data);
        const currentRoom = res.data;
        this.setState({
          title: currentRoom.title,
          description: currentRoom.description,
          roomId: currentRoom.roomId,
          error_msg: currentRoom.error_msg
        });
      })
      .catch(err => {
        if (err) console.log(err);
      });
  }

  getMap() {
    axiosWithAuth(this.token)
      .get(`${baseURL}/api/adv/rooms/`)
      .then(res => {
        console.log(res.data);
        const currentRoom = res.data;
        this.setState({
          world: res.data.world,
          roomId: res.data.roomId,
          mapOpen: true
        });
        console.log(this.state.world);
      })
      .catch(err => {
        if (err) console.log(err);
      });
  }

  buildMap(width) {
    let worldMap = [];
    const worldString = this.state.world;

    for (let i = 0; i < worldString.length; i++) {
      if (i > 0 && i % width === 0) {
        worldMap.push(<br key={`br ${i / width}`} />);
      }
      if (worldString[i] === ' ') {
        worldMap.push(<img key={i} src={whitespaceFiller} />);
      } else if (worldString[i] === '#') {
        worldMap.push(<img key={i} src={wall} />);
      } else if (worldString[i] === '|') {
        worldMap.push(<img key={i} src={vertPath} />);
      } else if (worldString[i] === '-') {
        worldMap.push(<img key={i} src={horizPath} />);
      } else if (worldString[i] === '\n') {
      } else {
        const room_string =
          worldString[i] + worldString[i + 1] + worldString[i + 2];
        if (this.state.roomId === room_string) {
          worldMap.push(<img key={i} src={room} />);
          worldMap.push(<img key={i} src={hero} />);
          worldMap.push(<img key={i} src={room} />);
          i += 2;
        } else {
          worldMap.push(<img key={i} src={room} />);
          worldMap.push(<img key={i} src={room} />);
          worldMap.push(<img key={i} src={room} />);
          i += 2;
        }
      }
    }
    return worldMap;
  }

  render() {
    let width = 0;
    for (let i = 0; i < this.state.world.length; i++) {
      if (this.state.world[i] === '#' || this.state.world[i] === ' ') {
        width += 1;
      } else {
        break;
      }
    }

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
            <p style={{ color: 'red' }}>{this.state.error_msg || ''}</p>
          </Container>
          <button onClick={() => this.submitMove('e')}>Head East</button>
        </Container>
        <SouthButton onClick={() => this.submitMove('s')}>
          Head South
        </SouthButton>
        <Container style={{ margin: '0 20%' }}>
          {this.state.mapOpen ? (
            <button onClick={() => this.setState({ mapOpen: false })}>
              Hide Map
            </button>
          ) : (
            <button onClick={() => this.getMap()}>Show Map</button>
          )}

          {this.state.mapOpen ? (
            <div>{this.buildMap(width + 1)}</div>
          ) : (
            <div></div>
          )}
        </Container>
      </Container>
    );
  }
}

export default World;
