import React, { Component } from 'react'

export default class Settings extends Component {
    render() {
        return (
            <section className="statistics">
            <h1>Statistics</h1>
            <form onSubmit={this.handleFormSubmit}>
              <input
                name="oldPass"
                placeholder="Old password"
                value={this.state.oldPass}
                onChange={e => this.handleChange(e)}
              />
              <input
                name="newPass"
                placeholder="New password"
                value={this.state.newPass}
                onChange={e => this.handleChange(e)}
              />
              <input
                name="newPassRepeat"
                placeholder="Repeat New Password"
                value={this.state.newPassRepeat}
                onChange={e => this.handleChange(e)}
              />

              <button>Submit</button>
            </form>

            <form onSubmit={this.handleFormSubmit}>
              <input
                name="image"
                placeholder="Choose Avatar URL"
                value={this.state.image}
                onChange={e => this.handleChange(e)}
              />
              </form>
              


              <button>Change avatar</button>
              </section>
        )
    }
}
