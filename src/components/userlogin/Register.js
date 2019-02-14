import React, { Component } from "react"
export default class Register extends Component {

    state = {
        userName: "",
        email: "",
        password: ""
    }

    handleFieldChange = evt => {
        const stateToChange= {};
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange);
    }

    fetchThoseUsers = evt => {
        evt.preventDefault();
      this.props.getAllUsers()
      .then(allUsers => {
          let usersArray = allUsers.filter(user => {
              return (user.userName === this.state.userName)
          })
          if (usersArray.length > 0) {
              alert("Sorry, this username is taken!")
          }
          else {
              alert("You're in!")

                this.props.addToJson({
                  "dataSet" : "users",
                  "fetchType" : "POST",
                  "dataBaseObject": {
                    userName: this.state.userName,
                    email: this.state.email,
                    password: this.state.password
                  }
                })
                this.props.history.push("/")
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="sidenav register-sidenav">
                <div className="login-main-text">
                    <h2>REGISTER</h2>
                    <p>Register a new account</p>
                </div>
                </div>
                <div className="main">
                <div className="col-md-6 col-sm-12">
                <div className="login-form">
                <form>
                    <div className="form-group">
                        <label htmlFor="UserName"> UserName: </label>
                        <input type="text" required onChange={this.handleFieldChange} id="userName" placeholder="Enter username Here" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email">Email:
                        </label>
                        <input type="text" required onChange={this.handleFieldChange} id="email"
                        placeholder = "Enter email here"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password:</label>
                        <input type="password" required onChange={this.handleFieldChange} id="password"
                        placeholder="Enter password here"/>
                    </div>
                    <button type="submit" className=" btn btn-register" onClick={this.fetchThoseUsers}> Register </button>
                </form>
            </div>
            </div>
            </div>
            </React.Fragment>
        )
}
    }