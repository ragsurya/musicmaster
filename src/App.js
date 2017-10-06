import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=13`;
    const ALBUM_URL = "https://api.spotify.com/v1/artists/";
    console.log('FETCH_URL', FETCH_URL);

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer BQDSgyOr3zkzztFKFTu96fAUpAejwnngf_TfNGa_NJGcW5szAPUa1ygjqJbNEZ6aZP-SH9SZlg9ib3-OgNFcnNGZq-7SecP4NUQlAxzG1wsoke20Xr_yjqVumOoGSICBD_LNrO3aCzXzH7bXGtWASTZAfnlMhjxOtQ'
      }
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists ? json.artists.items[0] : [];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=GB&`
      fetch(FETCH_URL, {
        method: 'GET',
        headers: {
        'Authorization' : 'Bearer BQDSgyOr3zkzztFKFTu96fAUpAejwnngf_TfNGa_NJGcW5szAPUa1ygjqJbNEZ6aZP-SH9SZlg9ib3-OgNFcnNGZq-7SecP4NUQlAxzG1wsoke20Xr_yjqVumOoGSICBD_LNrO3aCzXzH7bXGtWASTZAfnlMhjxOtQ'
        }
      })
      .then(response => response.json())
      .then(json => {
        // console.log('artist\'s top tracks', json);
        const { tracks } = json;
        this.setState({ tracks });
      })
    });
  }
  render(){
    return (
      <div className="app">
          <div className="app-title">Music Master</div>
          <FormGroup>
            <InputGroup>
              <FormControl
              type="text"
              placeholder="search your artist here"
              value={this.state.query}
              onChange = {event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                 if(event.key === 'Enter') {
                   this.search();
                 }
               }
            }
              />
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
{
  this.state.artist ?
          <div>
          <Profile
          artist = {this.state.artist}
          />

          <Gallery
          tracks={this.state.tracks}
          />
          </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
