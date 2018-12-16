import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Fullscreenable from 'react-fullscreenable';
import { withSize } from 'react-sizeme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';



const withSizeWrapper = withSize({ monitorHeight: true });

class Player extends Component {
    updatePlayerSize = () => {
        this.props.triggerGetPlayerSize(this.props.size);        
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.size) !== JSON.stringify(prevProps.size)) { 
            this.updatePlayerSize();
        }
    }
    render() {
        const { playing, loop } = this.props;
        return (
            <div>
                <ReactPlayer
                    url="https://res.cloudinary.com/dance-hive/video/upload/v1544581858/videos/DHDemo.mp4"
                    width="100%"
                    height="100%"
                    playing={playing}
                    loop={loop}
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
        loop: true
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
        this.setState({ playing: !this.state.playing })
    }
    toggleLoop = () => {
        this.setState({ loop: !this.state.loop })
    }
    componentDidUpdate() {
        // console.log(this.state.vidWidth);
        // console.log(this.state.vidHeight);
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
        const {isFront, onMirror, playing, loop} = this.state;
        return (
            <div style={bigassWrapper}>
                <div style={mover} className="mover">
                    <PlayerSizeAware triggerGetPlayerSize={this.getPlayerSize} playing={playing} loop={loop}/>
                </div>
                <div style={{position:'absolute', bottom: '0px'}}>
                    <button onClick={this.props.toggleFullscreen}>Fullscreen</button>
                    <Button style={buttonStyle} onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</Button>
                    <FormControlLabel style={buttonStyle} control={<Switch onChange={this.switchAngle} checked={isFront} />} 
                        label={isFront ? <span style={{color: 'white'}}>Front</span> : <span style={{color: 'white'}}>Back</span>} />
                    <FormControlLabel style={buttonStyle} control={<Switch onChange={this.onMirror} checked={onMirror}/>} label={<span style={{color: 'white'}}>Mirror</span>} />
                    <FormControlLabel style={buttonStyle} control={<Switch onChange={this.toggleLoop} checked={loop}/>} 
                        label={<span style={{color: 'white'}}>Loop</span>} />
                </div>
            </div>
        )
    }
}

const FullBasicVideo = Fullscreenable()(BasicVideo);
export default FullBasicVideo;