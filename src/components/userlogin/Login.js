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
    this.props.checkUserLogin()
        .then(allUsers => {
          // console.log(allUsers)
          let findingUser = allUsers.filter(user => user.userName === this.state.userName && user.password === this.state.password)
          // console.log(findingUser)
            if(findingUser.length < 1) {
                alert("We can't seem to find you! Rethink your password, or try registering below!")
            } else {
                allUsers.forEach(user => {
                    let loggedIn= false;
                    if (this.state.userName === user.userName && this.state.password === user.password) {
                            loggedIn= true;
                        }
                    if (loggedIn === true){
                        sessionStorage.setItem("user", user.id);
                        console.log("You're logged in as user", user.id)
                        this.props.history.push("/home");
                    }
                })
            }
        })

    }

    componentDidMount () {

        if (sessionStorage.getItem("user") !== null) {

            sessionStorage.removeItem("user")
        }
    }

render() {
    return (
        <React.Fragment>
            <div className="sidenav">
            <div className="login-main-text">
                <h2 className="logo-color">Gigster</h2>
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
                        <input type="password" className="form-control" required onChange={this.handleFieldChange} id="password" placeholder="Password"/>
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