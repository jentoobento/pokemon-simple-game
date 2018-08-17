import React from 'react';
import axios from 'axios'
import * as CreateMap from './CreateMap';
import './css/ChoosePokemon.css'

class ChoosePokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: [],
            backupTeam: [],
            btnClick: false,
            message: ''
        }
        this.swapPoke = this.swapPoke.bind(this);
    }

    componentDidMount() {
        this.setState({ message: 'assembling team....' });
        let num1 = Math.floor(Math.random() * 803) + 1; // get random num 1-802
        let num2 = Math.floor(Math.random() * 803) + 1;
        let num3 = Math.floor(Math.random() * 803) + 1;
        let num4 = Math.floor(Math.random() * 803) + 1;
        let num5 = Math.floor(Math.random() * 803) + 1;
        let num6 = Math.floor(Math.random() * 803) + 1;
        const teamNums = [num1, num2, num3, num4, num5, num6];
        const teamArr = [];

        for (let i = 0; i < 6; i++) {
            axios({
                method: 'GET',
                url: 'https://pokeapi.co/api/v2/pokemon/' + teamNums[i]
            })
                .then(poke => {
                    teamArr.push(poke.data);
                    this.setState({
                        team: teamArr.slice(0, 3),
                        backupTeam: teamArr.slice(3).map(poke => {
                            const newPoke = { ...poke };
                            newPoke.swapped = true;
                            return newPoke
                        }),
                        message: this.state.backupTeam.length < 3 ? 'assembling team........' : 'team is ready!!!'
                    })
                })
                .then(() => {
                    this.setState({
                        message: this.state.backupTeam.length < 3 ? 'assembling team........' : 'team is ready!!!'
                    })
                })
                .catch(err => console.log('Error getting poke', err));
        }
    }

    getRandomPoke = e => {
        this.setState({
            message: this.state.backupTeam.length < 3 ? 'please wait...' : 'team chosen!!!',
            btnClick: true
        })
    }

    swapPoke = e => {
        let swapIndex = e.target.parentElement.id
        let newTeam = this.state.team;
        newTeam[swapIndex] = this.state.backupTeam[swapIndex];
        this.setState({ team: newTeam })
    }

    cancelHandler = e => this.props.history.goBack();

    fightHandler = e => this.props.history.push("/fight");

    render() {
        const teamHtml = this.state.btnClick && this.state.team.map((poke, index) => CreateMap.CreateMap(poke, index, '', '', this.swapPoke))

        return (
            <React.Fragment>
                <div className="container">
                    <h1 class="my-4">Your Team
                        <small> {this.state.message}</small>
                    </h1>
                    <p>A random team will be chosen, you can swap once<br />
                        <button type="button" className="btn btn-danger" id="choose-btn" onClick={this.getRandomPoke}>I Choose You!!!</button>&nbsp;
                        {this.state.btnClick && <button type="button" className="btn btn-default" id="fight-btn" onClick={this.fightHandler}>Fight with this team!</button>}
                    <button type="button" className="btn btn-default" id="cancel-btn" onClick={this.cancelHandler}>Cancel</button>
                    </p>
                    <div class="row">
                        {teamHtml}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ChoosePokemon;