class DrumMachine extends React.Component {
  constructor() {
    super();
    this.playAudio = this.playAudio.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handlePowerClick = this.handlePowerClick.bind(this);
    this.activatePad = this.activatePad.bind(this);

    this.handleVolumeUp = this.handleVolumeUp.bind(this);
    this.handleVolumeDown = this.handleVolumeDown.bind(this);

    this.state = {
      display: '',
      volume: 80,
      power: false,
      kit: [
      { key: 'Q', active: false, src: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20CLHH.wav?1532352722339', name: 'CLHH' },
      { key: 'W', active: false, src: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20SNR%20D1.wav?1532352722730', name: 'SNR D1' },
      { key: 'E', active: false, src: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20RIM%20SHT.wav?1532352722795', name: 'RIM SHT' },
      { key: 'A', active: false, src: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20SNR%20D2.wav?1532352722873', name: 'SNR D2' },
      { key: 'S', active: false, src: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20RIDE.wav?1532352722922', name: 'RIDE' },
      { key: 'D', active: false, src: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20TOM1.wav?1532352723451', name: 'TOM1' },
      { key: 'Z', active: false, src: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20TOM2.wav?1532352723760', name: 'TOM2' },
      { key: 'X', active: false, src: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20COWBELL.wav?1532352724065', name: 'COWBELL' },
      { key: 'C', active: false, src: 'https://cdn.glitch.com/0966cc53-0935-45e4-9edf-7c4fa500e219%2FRX15%20OPHH.wav?1532352724689', name: 'OPHH' }] };


  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }
  playAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    this.updateDisplay(audio.dataset.name);
  }
  updateDisplay(text) {
    this.setState({ display: text });
  }
  mapKeyCode(code) {
    const keymap = {
      81: 'Q',
      87: 'W',
      69: 'E',
      65: 'A',
      83: 'S',
      68: 'D',
      90: 'Z',
      88: 'X',
      67: 'C' };

    return keymap[code];
  }
  handleKeyUp(e) {
    const x = this.mapKeyCode(e.keyCode);
    this.deactivatePad(x);
  }
  handleKeyDown(e) {
    if (!this.state.power) return;
    const x = this.mapKeyCode(e.keyCode);
    if (!x) return;
    this.activatePad(x);
    const audio = document.getElementById(x);
    if (!audio) return;
    audio.click();
  }
  activatePad(key) {
    this.setState({
      kit: this.state.kit.map(el => {
        return el.key === key ? Object.assign({}, el, { active: true }) : el;
      }) });

  }
  deactivatePad(key) {
    this.setState({
      kit: this.state.kit.map(el => {
        return el.key == key ? Object.assign({}, el, { active: false }) : el;
      }) });

  }
  handlePowerClick() {
    const text = this.state.power ? '' : 'Welcome';
    this.setState({ power: !this.state.power });
    this.setState({ display: text });
  }

  handleVolumeUp() {
    if (this.state.volume < 100) {
      this.setState({ volume: this.state.volume + 1 });
    }
    this.updateVolume();
  }

  handleVolumeDown() {
    if (this.state.volume > 0) {
      this.setState({ volume: this.state.volume - 1 });
    }
    this.updateVolume();
  }

  updateVolume() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
      audio.volume = this.state.volume / 100;
    });
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine", className: "drum-machine-body" }, /*#__PURE__*/
      React.createElement("div", { className: "drum-machine-body__top" }, "BeatPower ", /*#__PURE__*/React.createElement("span", { style: { float: 'right' } }, "DMZ0")), /*#__PURE__*/
      React.createElement("div", { className: "drum-machine-body__bottom" }, /*#__PURE__*/
      React.createElement("div", { className: "drum-machine-body__left-pad" }, /*#__PURE__*/
      React.createElement(VolumeDisplay, {
        power: this.state.power,
        volume: this.state.volume }), /*#__PURE__*/
      React.createElement(ButtonPanel, {
        power: this.state.power,
        handleVolumeUp: this.handleVolumeUp,
        handleVolumeDown: this.handleVolumeDown,
        handlePowerClick: this.handlePowerClick }), /*#__PURE__*/
      React.createElement(Display, {
        text: this.state.display,
        power: this.state.power }), /*#__PURE__*/
      React.createElement(DeviceFooter, null)), /*#__PURE__*/

      React.createElement("div", { className: 'drum-pad-container' + (this.state.power ? ' drum-pad-container--on' : '') },

      this.state.kit.map((pad) => /*#__PURE__*/
      React.createElement(DrumPad, {
        key: pad.key,
        volume: this.state.volume,
        pad: pad,
        play: this.playAudio }))))));






  }}


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.handlePadClick = this.handlePadClick.bind(this);
  }
  componentDidMount() {
    this.audioRef.current.volume = this.props.volume / 100;
  }
  handlePadClick() {
    this.props.play(this.audioRef.current);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: this.props.pad.name,
        role: "button", tabIndex: "-1",
        className: 'drum-pad' + (this.props.pad.active ? ' drum-pad--active' : ''),
        onClick: this.handlePadClick }, /*#__PURE__*/

      React.createElement("span", null, this.props.pad.key), /*#__PURE__*/
      React.createElement("audio", {
        className: "clip",
        src: this.props.pad.src,
        "data-name": this.props.pad.name,
        id: this.props.pad.key,
        preload: "true",
        ref: this.audioRef })));


  }}


DrumPad.propTypes = {
  volume: PropTypes.number.isRequired,
  pad: PropTypes.object.isRequired,
  play: PropTypes.func.isRequired };


class HoldButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  componentDidMount() {
    this.interval = null;
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleMouseDown() {
    this.interval = setInterval(this.props.handleHold, 50);
  }
  handleMouseUp() {
    clearInterval(this.interval);
  }
  handleMouseOut() {
    clearInterval(this.interval);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        role: "button",
        className: this.props.class,
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onMouseOut: this.handleMouseOut,
        onTouchStart: this.handleMouseDown,
        onTouchEnd: this.handleMouseUp }));


  }}


HoldButton.propTypes = {
  handleHold: PropTypes.func.isRequired,
  class: PropTypes.string.isRequired };


class VolumeDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: 'volume-display' + (this.props.power ? ' volume-display--on' : '') }, "Vol: ",
      this.props.volume, " %"));


  }}


VolumeDisplay.propTypes = {
  power: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired };



class PowerButton extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        role: "button",
        className: this.props.buttonClass,
        onClick: this.props.handlePowerClick }, /*#__PURE__*/
      React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, /*#__PURE__*/React.createElement("path", { d: "M256.026 0c-24.816 0-45.004 20.188-45.004 45.004V226.02c0 24.816 20.188 45.004 45.004 45.004s45.004-20.188 45.004-45.004V45.004C301.03 20.188 280.842 0 256.026 0z", fill: "#933EC5" }), /*#__PURE__*/React.createElement("path", { d: "M406.625 118.959c-18.939-17.083-46.502-15.14-63.041 1.873-16.632 17.109-17.917 46.086 3.153 65.296 33.44 30.395 50.343 76.459 42.336 122.928-10.868 63.067-65.717 112.767-133.05 112.915-68.971.152-121.809-50.77-132.708-110.617-8.497-46.747 7.179-93.553 41.972-125.197 21.01-19.127 19.913-48.232 3.234-65.36-16.567-17.013-44.295-18.851-63.4-1.56-52.909 47.923-80.527 118.769-72.843 190.58C44.496 423.995 140.9 512 256.553 512c114.326 0 207.934-88.216 222.368-194.743 10.064-74.23-16.964-148.358-72.296-198.298z", fill: "#933EC5" }))));


  }}


PowerButton.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  handlePowerClick: PropTypes.func.isRequired };


class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: 'drum-display' + (this.props.power ? ' drum-display--on' : ''), id: "display" },
      this.props.text));


  }}


Display.propTypes = {
  text: PropTypes.string.isRequired,
  power: PropTypes.bool.isRequired };



class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "button-panel" }, /*#__PURE__*/
      React.createElement(PowerButton, {
        buttonClass: 'power-button round-button' + (this.props.power ? ' round-button--on' : ''),
        handlePowerClick: this.props.handlePowerClick }), /*#__PURE__*/
      React.createElement(HoldButton, {
        handleHold: this.props.handleVolumeDown,
        class: 'vol-minus round-button' + (this.props.power ? ' round-button--on' : '') }), /*#__PURE__*/
      React.createElement(HoldButton, {
        handleHold: this.props.handleVolumeUp,
        class: 'vol-plus round-button' + (this.props.power ? ' round-button--on' : '') })));


  }}



ButtonPanel.propTypes = {
  handlePowerClick: PropTypes.func.isRequired,
  handleVolumeUp: PropTypes.func.isRequired,
  handleVolumeDown: PropTypes.func.isRequired,
  power: PropTypes.bool.isRequired };


const DeviceFooter = () => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "project-info" }, /*#__PURE__*/
    React.createElement("p", null, "Freecodecamp project:"), /*#__PURE__*/
    React.createElement("p", null, /*#__PURE__*/
    React.createElement("a", { href: "https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-drum-machine",
      target: "_blank" }, "Build a Drum Machine")), /*#__PURE__*/

    React.createElement("p", null, "made by ", /*#__PURE__*/React.createElement("a", { href: "https://codepen.io/sercanradulfr", target: "_blank" }, "Sercan Acikg\xF6z"))));


};

class App extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(DrumMachine, null)));


  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.getElementById('app'));