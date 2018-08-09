import React from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class CreateTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            attack: '',
            specialAttack: '',
            imageUrl: '',
            imagePreview: 'https://vignette.wikia.nocookie.net/joke-battles/images/d/d8/MissingNo..png/revision/latest?cb=20160129051405',
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            axios({
                method: 'GET',
                url: 'http://localhost:8080/api/pokemon/' + this.props.match.params.id
            })
                .then(response => {
                    console.log(response.data)
                })
                .catch(err => console.log(err))
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onImageUpload = e => {
        this.setState({
            imageUrl: e.target.value,
            imagePreview: e.target.value
        })
    }

    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles)
        this.setState(prev => {
            const newState = {
                ...prev,
                imageName: acceptedFiles[0].name,
                imagePreview: acceptedFiles[0].preview
            }
            return newState;
        })
    }

    goBackHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        const pokeObj = {
            name: this.state.name,
            sprites: {
                front_default: this.state.imageUrl ? this.state.imageUrl : 'https://vignette.wikia.nocookie.net/joke-battles/images/d/d8/MissingNo..png/revision/latest?cb=20160129051405'
            },
            moves: [
                { move: { name: this.state.attack } },
                { move: { name: this.state.specialAttack } }
            ],
            stats: [
                { base_stat: Math.floor(Math.random() * 51) + 1, stat: { name: "speed" } }, // percentage attack misses
                { base_stat: Math.floor(Math.random() * 51) + 1, stat: { name: "special-defense" } }, // not used
                { base_stat: Math.floor(Math.random() * (30 - 20 + 1) + 20), stat: { name: "special-attack" } },
                { base_stat: Math.floor(Math.random() * 26) + 1, stat: { name: "defense" } }, // percentage blocked
                { base_stat: Math.floor(Math.random() * 16) + 1, stat: { name: "attack" } },
                { base_stat: Math.floor(Math.random() * (99 - 30 + 1) + 30), stat: { name: "hp" } },
            ]
        }

        axios({
            method: 'POST',
            url: "http://localhost:8080/api/pokemon",
            data: pokeObj
        })
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <form className="container">
                <FormGroup controlId="formBasicText">
                    <h1>Enter details</h1>
                    <ControlLabel>name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.name}
                        placeholder="Enter text"
                        name="name"
                        onChange={this.onChangeHandler} />
                    <ControlLabel>attack name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.attack}
                        placeholder="Enter text"
                        name="attack"
                        onChange={this.onChangeHandler} />

                    <ControlLabel>special attack name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.specialAttack}
                        placeholder="Enter text"
                        name="specialAttack"
                        onChange={this.onChangeHandler} />
                    <ControlLabel>image</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.imageUrl}
                        placeholder="Enter link to image"
                        name="imageUrl"
                        onChange={this.onImageUpload} />
                    <Dropzone
                        accept="image/*"
                        onDrop={this.onDrop}
                        type="file"
                        name="imageUrl"
                        className="form-control rounded text-muted">
                        {this.state.imageUrl || 'drag file or click to add'}
                    </Dropzone>
                    <ControlLabel>image preview </ControlLabel>
                    <img src={this.state.imagePreview} width="100px" height="100px" />
                </FormGroup>
                <button type="button" className="btn btn-primary" onClick={this.continueHandler}>continue</button>
                <button type="button" className="btn btn-warning" onClick={this.goBackHandler}>go back</button>

            </form>
        )
    }
}

export default CreateTeam;