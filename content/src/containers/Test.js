import React from 'react';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            webSocketConn: '',
            messagesComingIn: []
        }
    }

    componentDidMount() {
        this.setState({
            webSocketConn: new WebSocket('ws://localhost:8181/')
        }, () => {
            this.state.webSocketConn.onmessage = message => {
                this.setState(prev => {
                    const newState = {...prev}
                    newState.messagesComingIn = newState.messagesComingIn.concat([message.data])
                    return newState
                })
            }
        })
    }


    onChangeHandler = e => {
        this.setState({
            text: e.target.value
        })
    }

    buttonHandler = e => {
        this.state.webSocketConn.send('test');
    }

    render() {
        return (
            <React.Fragment>
                <h1>test</h1>
                <input type="text" onChange={this.onChangeHandler} value={this.state.text} />
                <button type="button" onClick={this.buttonHandler} >click me</button>
                <p>{this.state.messagesComingIn}</p>
            </React.Fragment>
        )
    }
}

export default Test;
