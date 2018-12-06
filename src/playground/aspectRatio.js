import React, { Component } from 'react';
import Fullscreenable from 'react-fullscreenable';
import ReactPlayer from 'react-player';
import sizeMe from 'react-sizeme';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

export class Demo extends Component {
    constructor(props){
        super(props)
        this.state = {
          playing: true,
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
    toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
    }
    switchAngle = () => {
    this.setState(({top}) => ({ top: !top }))
    }
    onMirror = () => {
    this.setState(({mirror}) => ({mirror: !mirror}));
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

        const { width, height } = this.props.size;
        const changingHeight = height / 2;
        const aspectRatioBox = {
            backgroundColor: 'blue',
            width: '100%',
            height: '0',
            paddingTop: 'calc(1575 / 1400 * 100%)',
            position: 'relative',
            overflow: 'hidden',
            top: -changingHeight,
            display: 'flex'
        }

        const boxCutter = {
            position: 'absolute',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            top: this.state.top ? 0 : changingHeight,
            transform: this.state.mirror ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }

        const textOverlay = {
            position: 'absolute',
            top: '0',
            left: '50vw',
            color: 'white'
        }
        const controlsStyle = {
            display: 'flex',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.3)',
            bottom: 0,
            // add max height
            width: '100%',
            zIndex: 3,
            justifyContent: 'center',
            // alignItems: 'flex-end'
        }
        
        const buttonStyle = {
            color: 'white',
            zIndex: 10,
            // height: '10px'
        }
        const { loop, mirror, playing, playbackRate, top } = this.state;
          
        return (               
            <div style={aspectRatioBox} className="playerBox">
                <div style={boxCutter}>
                    <ReactPlayer 
                        url="https://res.cloudinary.com/dance-hive/video/upload/v1543824997/DH_test_2.mp4"
                        width="100%"
                        height="100%"
                        playing={playing}
                        onPlay={this.onPlay}
                        loop={loop}
                        playbackRate={playbackRate}
                    />
                    <div style={textOverlay}>
                        { width } x { height }
                    </div>
                </div>
                <div style={controlsStyle}>
                    <Button style={buttonStyle} onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</Button>
                    <Button style={buttonStyle} onClick={this.onClickFullscreen} id='fs-toggle'>Fullscreen</Button>
                    <Button style={buttonStyle} onClick={this.setPlaybackRate} value={0.5}>0.5</Button>
                    <Button style={buttonStyle} onClick={this.setPlaybackRate} value={0.75}>0.75</Button>
                    <Button style={buttonStyle} onClick={this.setPlaybackRate} value={1}>1</Button>
                    <Button style={buttonStyle} onClick={this.setPlaybackRate} value={1.5}>1.5</Button>
                    <Button style={buttonStyle} onClick={this.setPlaybackRate} value={2}>2</Button>
                    <FormControlLabel style={buttonStyle} control={<Switch onChange={this.toggleLoop} checked={loop}/>} 
                        label={<span style={{color: 'white'}}>Loop</span>} />
                    <FormControlLabel style={buttonStyle} control={<Switch onChange={this.switchAngle} checked={top} />} 
                        label={top ? <span style={{color: 'white'}}>Front</span> : <span style={{color: 'white'}}>Back</span>} />
                    <FormControlLabel style={buttonStyle} control={<Switch onChange={this.onMirror} checked={mirror}/>} label={<span style={{color: 'white'}}>Mirror</span>} />
                </div>
            </div>
        );
    }
}

const AspectVideo = Fullscreenable()(Demo);

export default sizeMe({ monitorHeight: true })(AspectVideo);
