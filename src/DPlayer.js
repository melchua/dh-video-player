import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fullscreenable from 'react-fullscreenable';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';




export class DemoComponent extends Component {
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
        this.props.toggleFullscreen();
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
    componentWillReceiveProps(nextProps) {
        if (this.props.isFullscreen !== nextProps.isFullscreen) {
            // Fullscreen status has changed.
        }
    }

    render() {
        const { isFullscreen, toggleFullscreen } = this.props;

        const buttonLabel = isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen';

        const toggleButton = <button onClick={toggleFullscreen}>{buttonLabel}</button>;

        const containerStyle = {
            width: '1920px', overflow:'hidden', height: '540px', position: 'relative', 
          }
        const playerBoxStyle = {
        position: 'absolute',
        top: this.state.top ? 0 : '-540px',
        transform: this.state.mirror ? 'rotateY(180deg)' : 'rotateY(0deg)',
        width: '100%',
        height: '100%',
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
              <div style={containerStyle}>
                <div style={playerBoxStyle} ref={this.ref}>
                  <ReactPlayer 
                    url="https://s3-us-west-2.amazonaws.com/dancehive-videos/full.mp4" 
                    width='1920px'  
                    height='1080px'
                    playing={playing}
                    onPlay={this.onPlay}
                    loop={loop}
                    playbackRate={playbackRate}
                  />
                </div>
                <div className="controls" style={controlsStyle}>
                  <Button style={buttonStyle} onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</Button>
                  <Button style={buttonStyle} onClick={this.stop}>Stop</Button>
                  <Button style={buttonStyle} onClick={this.onClickFullscreen} id='fs-toggle'>Fullscreen</Button>
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
                {toggleButton}
            </div>
        );
    }
}

DemoComponent.displayName = 'DemoComponent';

DemoComponent.propTypes = {
    isFullscreen: PropTypes.bool,
    toggleFullscreen: PropTypes.func,
    viewportDimensions: PropTypes.object,
};

const DPlayer = Fullscreenable()(DemoComponent);

export default DPlayer;