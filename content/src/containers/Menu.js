import React from 'react';
import { Link } from 'react-router-dom'
import "./Menu.css";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <div class="container">
          <h1 class="header">Page Heading
        <small>Secondary Text</small>
          </h1>
          <div class="row">
            <div class="col-md-7">
              <img className="img-fluid rounded mb-3 mb-md-0" src="http://i1017.photobucket.com/albums/af292/draxkamone/Fire%20Red%20Chapter%2001/Pokemon-FireRed_07.png" style={{ "width": "700px", "height": "300px" }} alt="" />
            </div>
            <div class="col-md-5 side-text">
              <h3>Choose</h3>
              <p>Get a radom team from the official database</p>
              <Link to='/choose-team'><button type="button" className="btn btn-danger">get</button></Link>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7">
              <a href="#">
                <img class="img-fluid rounded mb-3 mb-md-0" src="https://cdn.player.one/sites/player.one/files/styles/full_large/public/2016/08/14/pokemon-daycare.jpg" style={{ "width": "700px", "height": "300px" }} alt="" />
              </a>
            </div>
            <div class="col-md-5 side-text">
              <h3>Create your own</h3>
              <p>Add your creature to a separate database for use</p>
              <Link to='/create'><button type="button" className="btn btn" style={{ "backgroundColor": "#000", "color": "white" }}>add</button></Link>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7">
              <img class="img-fluid rounded mb-3 mb-md-0" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIe-l5prCwIZfCGmm1unbKdR1Fi3OFP9V_aIpWdh3EAmfe3t-A" style={{ "width": "700px", "height": "300px" }} alt="" />
            </div>
            <div class="col-md-5 side-text">
              <h3>Change</h3>
              <p>Edit a creature in the database</p>
              <Link to='/list'><button type="button" className="btn btn-default">update</button></Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Menu;