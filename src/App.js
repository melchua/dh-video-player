import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      playing: false,
      top: true,
      mirror: false,
      loop: false,
      playbackRate: 1.0
    }
  }
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }
  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }
  setPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.currentTarget.value) })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }
  switchAngle = () => {
    this.setState(({top}) => ({ top: !top }))
  }
  onMirror = () => {
    this.setState(({mirror}) => ({mirror: !mirror}));
  }
  ref = player => {
    this.player = player
  }
  
  render() {


    const containerStyle = {
      width: '1920px', overflow:'hidden', height: '540px', position: 'relative', 
    }
    const playerBoxStyle = {
      position: 'absolute',
      top: this.state.top ? 0 : '-540px',
      transform: this.state.mirror ? 'rotateY(180deg)' : 'rotateY(0deg)',
      width: '100%',
      height: '100%'
    }
    const controlsStyle = {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
      opacity: 0.7,
      bottom: 0,
      left: '420px',
      width: '100%',
      zIndex: 3
    }

    const buttonStyle = {
      color: 'white',
      zIndex: 10
    }
    const { loop, mirror, playing, playbackRate, top } = this.state;

    return (
      <div>
        <div style={containerStyle} >
          <div style={playerBoxStyle}>
            <ReactPlayer 
              url="https://s3-us-west-2.amazonaws.com/dancehive-videos/full.mp4" 
              width='1920px'  
              height='1080px'
              playing={playing}
              onPlay={this.onPlay}
              loop={loop}
              ref={this.ref}
              playbackRate={playbackRate}
            />
          </div>
          <div className="controls" style={controlsStyle}>
            <Button style={buttonStyle} onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</Button>
            <Button style={buttonStyle} onClick={this.stop}>Stop</Button>
            <Button style={buttonStyle} onClick={this.onClickFullscreen}>Fullscreen</Button>
            <Button style={buttonStyle} onClick={this.setPlaybackRate} value={0.5}>0.5</Button>
            <Button style={buttonStyle} onClick={this.setPlaybackRate} value={0.75}>0.75</Button>
            <Button style={buttonStyle} onClick={this.setPlaybackRate} value={1}>1</Button>
            <Button style={buttonStyle} onClick={this.setPlaybackRate} value={1.5}>1.5</Button>
            <Button style={buttonStyle} onClick={this.setPlaybackRate} value={2}>2</Button>
            <FormControlLabel style={buttonStyle} control={<Switch onChange={this.toggleLoop} checked={loop}/>} label="Loop" />
            <FormControlLabel style={buttonStyle} control={<Switch onChange={this.switchAngle} checked={top} />} 
              label={top ? "Front" : "Back"} />
            <FormControlLabel style={buttonStyle} control={<Switch onChange={this.onMirror} checked={mirror}/>} label="Mirror" />
          </div>
        </div>

        
        <p><a href='#' onClick={this.switchAngle}>Switch Side</a> | <a href="#" onClick={this.onMirror}>Mirror</a></p>

      </div>
    );
  }
}

export default App;

