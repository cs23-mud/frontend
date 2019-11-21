import React from "react";
import styled, {css} from "styled-components";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import vertPath from "../assets/vertical-path.png";
import horizPath from "../assets/horizontal-path.png";
import wall from "../assets/wall.png";
import whitespaceFiller from "../assets/whitespace.png";
import hero from "../assets/hero.png";
import room from "../assets/rooms.png";


const Container = styled.div``;
const Header = styled.div``;
const Title = styled.h1`
  text-align: center
`;

const Button = styled.button`
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  border-color: black;
  border-width: 2px;
  text-align: center;
  font-weight: bolder;
  font-size: 17px;
  background: white;
  color: palevioletred;
  margin-bottom: 20px;
  ${props => props.north && css`
  display: block;
  margin: 0 auto 20px;
`}
  ${props => props.south && css`
  display: block;
  margin: 0 auto 20px;
`}
`;
// Change to http://127.0.0.1:8000 for local testing, https://cs23-mud.herokuapp.com for deployed server
const baseURL = "https://cs23-mud.herokuapp.com";

class World extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("token");
    this.state = {
      mapOpen: false,
      title: "",
      description: "",
      error_msg: "",
      world: ""
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
        console.log("ascii", i, worldString[i]);
        worldMap.push(<img key={i} src={room} />);
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
      <Container>
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
            <p style={{ color: "red" }}>{this.state.error_msg || ""}</p>
          </Container>
          <Button onClick={() => this.submitMove("e")}>Head East</Button>
        </Container>
        <Button south onClick={() => this.submitMove("s")}>
          Head South
        </Button>
        </Movement>
        <Container style={{ margin: "0 20%" }}>
          {this.state.mapOpen ? (
            <Button onClick={() => this.setState({ mapOpen: false })}>
              Hide Map
            </Button>
          ) : (
            <Button onClick={() => this.getMap()}>Show Map</Button>
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
