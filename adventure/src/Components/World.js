import React from "react";
import styled, {css} from "styled-components";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import vertPath from "../assets/vertical-path.png";
import horizPath from "../assets/horizontal-path.png";
import wall from "../assets/wall.png";
import whitespaceFiller from "../assets/whitespace.png";
import hero from "../assets/hero.png";
import room from "../assets/rooms.png";


const Container = styled.div`
  ${props => props.main && css`
    position: relative
    background: #DBE6F6;
  
    height: 100vh
  `}
  ${props => props.ma && css`
  position: relative
  background: #C5796D
  height: 100vh
`}
`;
const Header = styled.div``;
const Title = styled.h1`
  text-align: center;
  font-size: 2.5em;
  letter-spacing: 2px;
  text-transform: uppercase
`;
const Movement = styled.div`
  width: 600px;
  padding: 25px;
  position: absolute;
  border-radius: 10px;
  background: ##DBE6F6
  text-align: center
  right: 5%;
  top: 50%
  border: 2px solid black;
  p  {
    font-size: 1.25em;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
    color: #222

  }
`;
const Button = styled.button`
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  border-color: black;
  border-width: 2px;
  text-align: center;
  font-weight: bolder;
  font-size: 17px;
  background: ;
  background: #DBE7F6
  box-shadow: 0 2px 5px 0 #000
  color: #C5796D;
  margin-bottom: 20px;
  transition: all .2s ease-in-out
  ${props => props.north && css`
  display: block;
  margin: 0 auto 20px;
`}
  ${props => props.south && css`
  display: block;
  margin: 0 auto 20px;
`}
  &:hover{
    cursor: pointer;
  }
  &:active{
    transform: translateY(5px)
  }
`;
// Change to http://127.0.0.1:8000 for local testing, https://cs23-mud.herokuapp.com for deployed server
const baseURL = "https://cs23-mud.herokuapp.com";

class World extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("token");
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
          roomId: currentRoom.roomId,
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

      // worldMap.push(<img src={hero}/>)
      if (worldString[i] === " ") {
        worldMap.push(<img key={i} src={whitespaceFiller} />);
      } else if (worldString[i] === "#") {
        worldMap.push(<img key={i} src={wall} />);
      } else if (worldString[i] === "|") {
        worldMap.push(<img key={i} src={vertPath} />);
      } else if (worldString[i] === "-") {
        worldMap.push(<img key={i} src={horizPath} />);
      } else if (worldString[i] === "\n") {
      } else {
        const room_string =
          worldString[i] + worldString[i + 1] + worldString[i + 2];
        if (this.state.roomId === room_string) {
          worldMap.push(<img key={i} src={room} />);
          worldMap.push(<img key={i + 1} src={hero} />);
          worldMap.push(<img key={i + 2} src={room} />);
          i += 2;
        } else {
          worldMap.push(<img key={i} src={room} />);
          worldMap.push(<img key={i + 1} src={room} />);
          worldMap.push(<img key={i + 2} src={room} />);
          i += 2;
        }
      }
      // if(worldMap)
      // worldMap[0] = <img key={i} src={hero} />
    }
    return worldMap;
  }

  render() {
    let width = 0;
    for (let i = 0; i < this.state.world.length; i++) {
      if (this.state.world[i] === "#" || this.state.world[i] === " ") {
        width += 1;
      } else {
        break;
      }
    }

    return (
      <Container main>
        <Header>
          <Title>MUD Adventure!</Title>
        </Header>

      <Movement>
        <Button north onClick={() => this.submitMove("n")}>
          Head North
        </Button>
        <Container style={{ display: "flex" }}>
          <Button onClick={() => this.submitMove("w")}>Head West</Button>
          <Container style={{ margin: "0 auto" }}>
            <p>{this.state.title || ""}</p>
            <p>{this.state.description || "Loading..."}</p>
            <p style={{ color: "red" }}>{this.state.error_msg}</p>
          </Container>
          <Button onClick={() => this.submitMove("e")}>Head East</Button>
        </Container>
        <Button south onClick={() => this.submitMove("s")}>
          Head South
        </Button>
        </Movement>
        <Container style={{ margin: "0 10%" }}>
          {this.state.mapOpen ? (
            <Button onClick={() => this.setState({ mapOpen: false })}>
              Hide Map
            </Button>
          ) : (
            <Button onClick={() => this.getMap()}>Show Map</Button>
          )}
          
            <Container map>
          {this.state.mapOpen ? (
            <div>{this.buildMap(width + 1)}</div>
          ) : (
            <div></div>
          )}
          </Container>
        </Container>
      </Container>
    );
  }
}

export default World;
