import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

class Lengths extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "lengths" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h3", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("div", { className: "length" }, /*#__PURE__*/
      React.createElement("button", { onClick: this.props.handleLength, id: "break-increment", className: "btn", value: "breakplus" }, "+"), /*#__PURE__*/
      React.createElement("span", { id: "break-length" }, this.props.break), /*#__PURE__*/
      React.createElement("button", { onClick: this.props.handleLength, id: "break-decrement", className: "btn", value: "breakminus" }, "-"))), /*#__PURE__*/


      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h3", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("div", { className: "length" }, /*#__PURE__*/
      React.createElement("button", { onClick: this.props.handleLength, id: "session-increment", className: "btn", value: "sessionplus" }, "+"), /*#__PURE__*/
      React.createElement("span", { id: "session-length" }, this.props.session), /*#__PURE__*/
      React.createElement("button", { onClick: this.props.handleLength, id: "session-decrement", className: "btn", value: "sessionminus" }, "-")))));




  }}


class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "counter" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", { id: "timer-label" }, this.props.sessionType)), /*#__PURE__*/

      React.createElement("div", { id: "time-left" }, this.props.timeTransform())));


  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 25,
      break: 5,
      timer: 1500,
      status: "paused",
      sessionType: "Session",
      countdown: '' };

    this.handleLength = this.handleLength.bind(this);
    this.reset = this.reset.bind(this);
    this.timeTransform = this.timeTransform.bind(this);
    this.tick = this.tick.bind(this);
    this.changeType = this.changeType.bind(this);
    this.manageCountdown = this.manageCountdown.bind(this);
    this.chime = this.chime.bind(this);
  }
  handleLength(e) {
    switch (e.target.value) {
      case "sessionplus":
        if (this.state.session + 1 <= 60) {
          this.setState({
            session: this.state.session + 1,
            timer: (this.state.session + 1) * 60 });

        }
        break;
      case "sessionminus":
        if (this.state.session - 1 > 0) {
          this.setState({
            session: this.state.session - 1,
            timer: (this.state.session - 1) * 60 });

        }
        break;
      case "breakplus":
        if (this.state.break + 1 <= 60) {
          this.setState({
            break: this.state.break + 1 });

        }
        break;
      case "breakminus":
        if (this.state.break - 1 > 0) {
          this.setState({
            break: this.state.break - 1 });

        }
        break;}

  }
  reset() {
    clearInterval(this.state.countdown);
    let beepAudio = document.getElementById("beep");
    beepAudio.pause();
    beepAudio.currentTime = 0;
    this.setState({
      session: 25,
      break: 5,
      timer: 1500,
      status: "paused",
      sessionType: "Session" });

  }
  timeTransform() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }
  manageCountdown() {
    if (this.state.status === "paused") {
      this.setState({
        status: "running",
        countdown: setInterval(this.tick, 1000) });

    } else
    if (this.state.status === "running") {
      this.setState({
        status: "paused" });

      clearInterval(this.state.countdown);
    }
  }
  tick() {
    if (this.state.timer > 0) {
      this.setState({
        timer: this.state.timer - 1 });

    } else {
      this.chime();
      this.changeType();
    }
  }
  changeType() {
    let change;
    switch (this.state.sessionType) {
      case 'Session':
        change = this.state.break * 60;
        this.setState({
          sessionType: 'Break',
          timer: change });

        break;
      case 'Break':
        change = this.state.break * 60;
        this.setState({
          sessionType: 'Session',
          timer: change });

        break;}

  }
  chime() {
    document.getElementById("beep").play();
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "25 + 5 Clock"), /*#__PURE__*/
      React.createElement(Lengths, { handleLength: this.handleLength, session: this.state.session, break: this.state.break }), /*#__PURE__*/
      React.createElement(Counter, { timeTransform: this.timeTransform, sessionType: this.state.sessionType }), /*#__PURE__*/
      React.createElement("div", { id: "buttons" }, /*#__PURE__*/
      React.createElement("button", { onClick: this.manageCountdown, id: "start_stop" }, "Play"), /*#__PURE__*/
      React.createElement("button", { onClick: this.reset, id: "reset" }, "Reset")), /*#__PURE__*/

      React.createElement("audio", {
        id: "beep",
        preload: "auto", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));

/*

User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 audio tag and have a corresponding id="beep".

User Story #27: The audio element with id="beep" must be 1 second or longer.

User Story #28: The audio element with id of beep must stop playing and be rewound to the beginning when the element with the id of reset is clicked.

*/