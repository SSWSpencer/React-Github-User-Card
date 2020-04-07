import React from 'react';
import axios from "axios";
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      person: {},
      personName: "",
      followers: [],
      following: []
    };
  }

  componentDidMount() {
    axios.get("https://api.github.com/users/sswspencer")
    .then(res => {
      console.log(res.data)
      this.setState({
        person: res.data
      })
      axios.get("https://api.github.com/users/sswspencer/followers")
      .then(response =>{
        console.log(response.data)
        this.setState({
          followers: response.data
        })
      })
      axios.get("https://api.github.com/users/sswspencer/following")
      .then(response => {
        console.log(response.data)
        this.setState({
          following: response.data
        })
      } )
    })
  }

  findPerson = event =>{
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.personName}`)
    .then(res=>{
      this.setState({
        person: res.data
      })
      axios.get(`https://api.github.com/users/${this.state.personName}/followers`)
      .then(response =>{
        console.log(response.data)
        this.setState({
          followers: response.data
        })
      })
      axios.get(`https://api.github.com/users/${this.state.personName}/following`)
      .then(response => {
        console.log(response.data)
        this.setState({
          following: response.data
        })
      } )
    })
  }
  handleChange = event => {
    this.setState({
      personName: event.target.value
    })
  }

  changePerson(name){
    this.state.personName = name;
    console.log(this.state.personName);
    axios.get(`https://api.github.com/users/${this.state.personName}`)
    .then(res=>{
      this.setState({
        person: res.data
      })
      axios.get(`https://api.github.com/users/${this.state.personName}/followers`)
      .then(response =>{
        console.log(response.data)
        this.setState({
          followers: response.data
        })
      })
      axios.get(`https://api.github.com/users/${this.state.personName}/following`)
      .then(response => {
        console.log(response.data)
        this.setState({
          following: response.data
        })
      } )
    })
  }

  render(){
    return (
      <div className="App">
        <div className="TopPanel">
          <h1>Github User Card</h1>
          <input type="text" placeholder="Enter a Github Login"value={this.state.personName} onChange={this.handleChange}></input>
          <button onClick={this.findPerson}>Search Login</button>
        </div>
        <div className = "UserCard">
          <img src={this.state.person.avatar_url} alt={this.state.person.login} />
          <div className="UserContent">
          <h2>Username: <a href={this.state.person.html_url}>{this.state.person.login}</a></h2>
            <p>Name: {this.state.person.name}</p>
            <p>Location: {this.state.person.location}</p>
            <p>Followers: {this.state.followers.map(res =>(<a onClick={()=>{this.changePerson(res.login)}}>{res.login}, </a>))}</p>
            <p>Following: {this.state.following.map(res =>(<a onClick={()=>{this.changePerson(res.login)}}>{res.login}, </a>))}</p>
            <p>Bio: {this.state.person.bio}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
