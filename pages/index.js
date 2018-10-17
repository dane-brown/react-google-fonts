import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fonts : [],
      font_face: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAbZqJuOGT1tYy6Y0ZiKXLWGhaf1O8eQe0')
    .then(res => res.json())
    .then(data =>
      this.setState({
        fonts: data.items
      })
    )


  }

  handleSubmit(event) {
    let selected_font = this.refs.fontSelect.value;
    console.log(selected_font);
    fetch('https://fonts.googleapis.com/css?family=' + selected_font)
    .then(res => res.text())
    .then(data =>
      this.setState({
        font_face: data
      })
    )
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Choose Font To Generate Font Faces</h1>
        <form onSubmit={this.handleSubmit}>
            <select ref="fontSelect">
              {this.state.fonts.map((font) => <option key={font.family} value={font.family} >{font.family}</option> )}
            </select>
            <button>Submit</button>
        </form>
        <br/>
      <pre>{this.state.font_face}</pre>
      </div>
    )
  }
};

export default Home
