import {Component, Fragment} from "react";

const React = require('react');
const ReactDOM = require('react-dom');
// const client = require('./client');

class Application extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="w-100">
                    <h1 className={'w-100'}>Hello, world!</h1>
                    <p>Hello, Vladimir!</p>
                    <p>I'm your first React application!</p>
                </div>
            </Fragment>
        );
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div
              className="w-100 h-25"
              style={{background: "blue"}}
          >
            <h1>
                Модуль управления платой
            </h1>
          </div>
        );
    }
}

ReactDOM.render(
    <Application/>,
    document.getElementById("react")
);