import React from 'react';

class FightScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>test1</h1>
                        </div>
                        <div className="col-lg-6">
                            <h1>test2</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>test3</h1>
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png" style={{ "height": "500px", "width": "500px" }} />
                        </div>
                        <div className="col-lg-6">
                            <h1>test4</h1>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default FightScreen;