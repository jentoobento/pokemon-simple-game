import React from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import './CreateTeam.css';

class CreateTeam extends React.Component {
    state = {
        name: '',
        attack: '',
        specialAttack: '',
        imageUrl: '',
        preview: 'https://vignette.wikia.nocookie.net/joke-battles/images/d/d8/MissingNo..png/revision/latest?cb=20160129051405'
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            axios({
                method: 'GET',
                url: 'http://localhost:8080/api/pokemon/' + this.props.match.params.id
            })
                .then(response => {
                    this.setState({
                        name: response.data.name,
                        attack: response.data.moves[0].move.name,
                        specialAttack: response.data.moves[1].move.name,
                        imageUrl: response.data.sprites.front_default,
                        preview: response.data.sprites.front_default
                    })
                })
                .catch(err => console.log(err))
        }
    }

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // ******** DROP ZONE NOT HOOKED UP TO CLOUD SERVICES ******* //
    // onDrop = (acceptedFiles) => {
    //     this.setState(prev => {
    //         const newState = {
    //             ...prev,
    //             imageName: acceptedFiles[0].name,
    //             imagePreview: acceptedFiles[0].preview
    //         }
    //         return newState;
    //     })
    // }

    goBackHandler = () => this.props.history.goBack();

    continueHandler = () => {
        const pokeObj = {
            name: this.state.name,
            sprites: {
                front_default: this.state.imageUrl
            },
            moves: [
                { move: { name: this.state.attack } },
                { move: { name: this.state.specialAttack } }
            ],
            stats: [
                { base_stat: Math.floor(Math.random() * 51) + 1, stat: { name: "speed" } }, // difference between you and enemy = percentage attack misses, passive
                { base_stat: Math.floor(Math.random() * 51) + 1, stat: { name: "special-defense" } }, // not used
                { base_stat: Math.floor(Math.random() * (30 - 20 + 1) + 20), stat: { name: "special-attack" } }, // ap 5
                { base_stat: Math.floor(Math.random() * 26) + 1, stat: { name: "defense" } }, // percentage blocked when defending, ap 5
                { base_stat: Math.floor(Math.random() * 16) + 1, stat: { name: "attack" } }, // ap 5
                { base_stat: Math.floor(Math.random() * (99 - 30 + 1) + 30), stat: { name: "hp" } }, // amount must reach zero to be counted as ko
            ]
        }
        let method = this.props.match.params.id ? 'PUT' : 'POST';
        let url = this.props.match.params.id ? "http://localhost:8080/api/pokemon/" + this.props.match.params.id : "http://localhost:8080/api/pokemon";
        axios({
            method: method,
            url: url,
            data: pokeObj
        })
            .then(() => this.props.history.push("/list"))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <form className="container">
                <FormGroup controlId="formBasicText">
                    <h1>Enter details</h1>
                    <ControlLabel>Pokemon Name</ControlLabel>
                    <FormControl
                        className="text-box"
                        type="text"
                        value={this.state.name}
                        placeholder="Enter the name of your newly discovered creature"
                        name="name"
                        onChange={this.onChangeHandler} />
                    <ControlLabel>First Move</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.attack}
                        placeholder="Enter the name of this creature's commonly used move"
                        name="attack"
                        onChange={this.onChangeHandler} />
                    <ControlLabel>Secondary Move</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.specialAttack}
                        placeholder="Enter the name of this creature's special move"
                        name="specialAttack"
                        onChange={this.onChangeHandler} />
                    <ControlLabel>Image</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.imageUrl}
                        placeholder="Enter a link to a picture of this creature"
                        name="imageUrl"
                        onChange={this.onChangeHandler} />
                    {/* <ControlLabel>dropzone</ControlLabel>
                    <Dropzone
                        accept="image/*"
                        onDrop={this.onDrop}
                        type="file"
                        name="imageUrl"
                        className="form-control rounded text-muted">
                        Drag file here or click to add
                    </Dropzone> */}
                    <ControlLabel>Preview:</ControlLabel>
                    <img src={this.state.imageUrl ? this.state.imageUrl : this.state.preview} width="100px" height="100px" />
                </FormGroup>
                <button type="button" className="btn btn-danger continue-btn" onClick={this.continueHandler}>Add</button>
                <button type="button" className="btn btn-default back-btn" onClick={this.goBackHandler}>Go back</button>
            </form>
        )
    }
}

export default CreateTeam;