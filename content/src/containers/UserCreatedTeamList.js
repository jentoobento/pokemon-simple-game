import React from 'react';
import axios from 'axios';
import * as CreateMap from './CreateMap';

class UserCreatedTeamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUserCreatedPokes: [],
            btnClick: false
        };
        this.deleteHandler = this.deleteHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/pokemon/'
        })
            .then(response => {
                console.log(response)
                this.setState({
                    allUserCreatedPokes: response.data
                })
            })
            .catch(err => console.log('error getting user created items', err))
    }

    goBackHandler = e => {
        this.props.history.goBack();
    }

    deleteHandler(e) {
        const id = e.target.parentElement.parentElement.id;

        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/api/pokemon/' + id
        })
            .then(() => {
                const newList = this.state.allUserCreatedPokes.filter(poke => poke._id !== id);
                this.setState({
                    allUserCreatedPokes: newList
                })
            })
            .catch(err => console.log('error could not delete', err))
    }

    editHandler(e) {
        const id = e.target.parentElement.parentElement.id;
        this.props.history.push("/list/" + id);
    }

    render() {
        const allItemsHtml = this.state.allUserCreatedPokes && this.state.allUserCreatedPokes.map((poke, index) => CreateMap.CreateMap(poke, index, 'userCreated', this.deleteHandler, this.editHandler))

        return (
            <React.Fragment>
                <div className="col-md-12 container">
                    <h1>all ur fugly things</h1>
                    <button type="button" className="btn btn-warning" onClick={this.goBackHandler}>go back</button>
                    <br />
                    {allItemsHtml}
                </div>
            </React.Fragment>
        )
    }
}

export default UserCreatedTeamList;