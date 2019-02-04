import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Login.css"



export default class Login extends Component {

    state = {
        userName: "",
        password: ""
    }

    handleFieldChange = evt => {
        const stateToChange= {};
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange);
    };

    onLogin = (evt) => {
    evt.preventDefault();
    this.props.registerHere(this.state.userName, this.state.password)
        .then(allUsers => {
            if(allUsers.length < 1) {
                alert("We can't seem to find you! Try registering below")
            } else {
                allUsers.forEach(user => {
                    let loggedIn= false;
                    if (this.state.userName === user.userName && this.state.password === user.password) {
                            loggedIn= true;
                        }
                    if (loggedIn === true){
                        sessionStorage.setItem("User", user.id);
                        this.props.history.push("/news");
                    }
                })
            }
        })

    }

    componentDidMount () {

        if (sessionStorage.getItem("User") !== null) {

            sessionStorage.removeItem("User")
        }
    }

render() {
    return (
        <React.Fragment>
            <div className="sidenav">
            <div className="login-main-text">
                <h2>Welcome</h2>
                <p>Login or register here</p>
            </div>
            </div>
            <div className="main">
            <div className="col-md-6 col-sm-12">
            <div className="login-form">
                <form>
                    <div className="form-group">
                        <label htmlFor="UserName"> User Name: </label>
                        <input type="text" className="form-control" required onChange={this.handleFieldChange} id="userName"
                        placeholder="User Name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Password">Password:</label>
                        <input type="text" className="form-control" required onChange={this.handleFieldChange} id="password" placeholder="Password"/>
                    </div>
                    <button className="btn btn-login" type="submit" onClick={this.onLogin}> Submit </button>
                    <p className="not-a-user">Not a User? <Link to="/register">Register Here</Link></p>
                </form>
            </div>
            </div>
            </div>
        </React.Fragment>
        )
    }
}