import React from 'react';
import axios from 'axios'
import * as CreateMap from './CreateMap';

class ChoosePokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: [],
            backupTeam: [],
            btnClick: false,
            message: ''
        }
    }

    componentDidMount() {
        this.setState({
            message: 'assembling team.....'
        })
        // get random num 1-802
        let num1 = Math.floor(Math.random() * 803) + 1;
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
                    console.log(poke.data);
                    teamArr.push(poke.data);
                    this.setState({
                        team: teamArr
                    })
                })
                .catch(err => console.log('Error getting poke', err));
        }

        axios({
            method: 'GET',
            url: 'https://localhost:8080/pokemon/'
        })
            .then(poke => {

            })
            .catch(err => console.log('Error getting poke', err));
    }

    getRandomPoke = e => {
        this.setState({
            message: 'team chosen!!!',
            btnClick: true
        })
    }

    cancelHandler = e => {
        this.props.history.goBack();
    }

    render() {
        const teamHtml = this.state.btnClick && this.state.team.map(poke => CreateMap.CreateMap(poke))

        return (
            <React.Fragment>
                <button type="button" style={{ "backgroundColor": "#d14142", "color": "white" }} className="btn btn" onClick={this.getRandomPoke}>I Choose You!!!</button>
                <button type="button" style={{ "backgroundColor": "#000", "color": "white" }} className="btn btn" onClick={this.cancelHandler}>Retreat coward</button>
                <p>{this.state.message}</p>
                {teamHtml}
            </React.Fragment>
        )
    }
}

export default ChoosePokemon;