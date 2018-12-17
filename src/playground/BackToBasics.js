import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Fullscreenable from 'react-fullscreenable';
import { withSize } from 'react-sizeme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Loop from '@material-ui/icons/Loop';
import Fullscreen from '@material-ui/icons/Fullscreen'; 
import FullscreenExit from '@material-ui/icons/FullscreenExit'; 
import VolumeUp from '@material-ui/icons/VolumeUp'; 
import VolumeOff from '@material-ui/icons/VolumeOff'; 
import Slider from '@material-ui/lab/Slider';

const withSizeWrapper = withSize({ monitorHeight: true });

class Player extends Component {
    playerRef = React.createRef();
    updatePlayerSize = () => {
        this.props.triggerGetPlayerSize(this.props.size);        
    }
    componentDidMount() {
        console.log(this.playerRef);
        this.props.onRef(this);
    }
    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.size) !== JSON.stringify(prevProps.size)) { 
            this.updatePlayerSize();
        }
    }
    render() {
        const { playing, loop, onProgress, muted } = this.props;
        return (
            <div>
                <ReactPlayer
                    ref={this.playerRef}
                    url="https://res.cloudinary.com/dance-hive/video/upload/v1544581858/videos/DHDemo.mp4"
                    width="100%"
                    height="100%"
                    playing={playing}
                    loop={loop}
                    onProgress={onProgress}
                    muted={muted}
                />
            </div>
        )    
    }
}

const PlayerSizeAware = withSizeWrapper(Player);

class BasicVideo extends Component {
    state = {
        vidWidth: 0,
        vidHeight: 0,
        isFront: true,
        isMirror: true,
        playing: true,
        loop: true,
        played: 0,
        seeking: false
    }
    
    getPlayerSize = (sizeFromPlayer) => {
        this.setState({ vidHeight: sizeFromPlayer.height / 2});
        this.setState({ vidWidth: sizeFromPlayer.width});
    }
    
    // handlers for controls
    switchAngle = () => {
        this.setState(({isFront}) => ({ isFront: !isFront }))
    }
    onMirror = () => {
        this.setState(({mirror}) => ({mirror: !mirror}));
    }
    playPause = () => {
        this.setState(({playing}) =>  ({ playing: !playing }))
    }
    toggleLoop = () => {
        this.setState(({loop}) =>  ({ loop: !loop }))
    }
    toggleMuted = () => {
        this.setState(({muted}) => ({ muted: !muted }));
    }
    handleSliderValueChange = (e, value) => {
        this.setState({ played: value});
        console.log('on change value: ', value);
        this.child.playerRef.current.seekTo(parseFloat(value));
    }
    onSeekMouseDown = e => {
        this.setState({ seeking: true })
    }
    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }
    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.child.playerRef.current.seekTo(parseFloat(e.target.value))
    }
    onProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }
    componentDidUpdate() {
        // console.log(this.state.vidWidth);
        // console.log(this.state.vidHeight);
        console.log(this.state.played);
    }
    render() {
        const bigassWrapper = {
            position: 'relative',
            height: this.state.vidHeight,  //**** I think this will work! just need to feed the width/height into this! */
            width: '100%',
            overflow: 'hidden'
        }
        const mover = {
            position: 'absolute',
            top: this.state.isFront ?  0 : -this.state.vidHeight,
            transform: this.state.mirror ? 'rotateY(180deg)' : 'rotateY(0deg)',
            width: '100%',
            height: '100%', // height needs to be a number that comes from state and child component
            backgroundColor: 'black',
        }
        const buttonStyle = {
            color: 'white',
            // zIndex: 10,
            // height: '10px'
        }
        const controlBarStyle = {
            backgroundColor: 'rgba(0,0,0,0.4)',
            position: 'absolute',
            bottom: '0px',
            width: '100%'
        }
        const rangeStyle = {
            width: '100%',
            borderRadius: '1.3px',
            border: '0.2px solid #010101'
        }
        const {isFront, onMirror, playing, loop, muted, played} = this.state;
        const {isFullscreen, toggleFullscreen} = this.props;

        return (
            <div style={bigassWrapper}>
                <div style={mover} className="mover">
                    <PlayerSizeAware onRef={ref => (this.child = ref)} triggerGetPlayerSize={this.getPlayerSize} muted={muted} playing={playing} loop={loop} onProgress={this.onProgress}/>
                </div>
                <div style={controlBarStyle}>
                    <div style={rangeStyle}>
                        {/* <Slider
                            value={played}
                            aria-labelledby="label"
                            onChange={this.handleSliderValueChange}
                            // onMouseDown={this.onSeekMouseDown}
                            // onChange={this.onSeekChange}
                            // onMouseUp={this.onSeekMouseUp}
                        /> */}

                        <input 
                            style={{width: '100%'}}
                            type="range" 
                            min={0} 
                            max={1} 
                            step="any"
                            value={played}
                            onMouseDown={this.onSeekMouseDown}
                            onChange={this.onSeekChange}
                            onMouseUp={this.onSeekMouseUp}
                        />

                    </div>
                    <div>
                        <Button style={buttonStyle} onClick={this.playPause}>{playing ? <Pause /> : <PlayArrow />}</Button>
                        <Button style={buttonStyle} onClick={this.toggleLoop}>{loop ? <Loop style={{color: 'red'}} /> : <Loop style={{color: 'white'}} />}</Button>
                        <Button style={buttonStyle} onClick={this.toggleMuted}>{muted ? <VolumeOff style={{color: 'white'}} /> : <VolumeUp style={{color: 'white'}} />}</Button>
                    
                        <FormControlLabel style={buttonStyle} control={<Switch onChange={this.switchAngle} checked={isFront} />} 
                            label={isFront ? <span style={{color: 'white'}}>Front</span> : <span style={{color: 'white'}}>Back</span>} />
                        <FormControlLabel style={buttonStyle} control={<Switch onChange={this.onMirror} checked={onMirror}/>} label={<span style={{color: 'white'}}>Mirror</span>} />
                        <Button style={buttonStyle} onClick={toggleFullscreen}>{isFullscreen ? <FullscreenExit style={{color: 'white'}} /> : <Fullscreen style={{color: 'white'}} />}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const FullBasicVideo = Fullscreenable()(BasicVideo);
export default FullBasicVideo;