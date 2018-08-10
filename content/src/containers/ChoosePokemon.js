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
        this.swapPoke = this.swapPoke.bind(this);
    }

    componentDidMount() {
        this.setState({ message: 'assembling team....' })
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

        // axios({
        //     method: 'GET',
        //     url: 'https://localhost:8080/pokemon/'
        // })
        //     .then(poke => {
        //         console.log(poke)
        //     })
        //     .catch(err => console.log('Error getting poke', err));
    }

    getRandomPoke = e => {
        this.setState({
            message: this.state.backupTeam.length < 3 ? 'please wait...' : 'team chosen!!!',
            btnClick: true
        })
    }

    swapPoke = e => {
        let swapIndex = e.target.parentElement.parentElement.id
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
                <button type="button" style={{ "backgroundColor": "#d14142", "color": "white" }} className="btn btn" onClick={this.getRandomPoke}>I Choose You!!!</button>
                <button type="button" style={{ "backgroundColor": "#000", "color": "white" }} className="btn btn" onClick={this.cancelHandler}>Retreat coward</button>
                <button type="button" className="btn btn-default" onClick={this.fightHandler}>fight with this team!</button>
                <p>{this.state.message}</p>
                {teamHtml}
            </React.Fragment>
        )
    }
}

export default ChoosePokemon;