import React from "react";
import { Route } from "react-router-dom";
import Menu from './Menu';
import ChoosePokemon from "./ChoosePokemon";
import CreateTeam from "./CreateTeam";
import UserCreatedTeamList from "./UserCreatedTeamList";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" component={Menu} />
                <Route exact path="/choose-team" component={ChoosePokemon} />
                <Route exact path="/create" component={CreateTeam} />
                <Route exact path="/list" component={UserCreatedTeamList} />
                <Route exact path="/list/:id" component={CreateTeam} />
            </React.Fragment>
        );
    }
}
export default Index;
