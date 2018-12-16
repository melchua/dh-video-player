import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Fullscreenable from 'react-fullscreenable';
import { withSize } from 'react-sizeme';

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
        return (
            <div>
                <ReactPlayer
                    url="https://res.cloudinary.com/dance-hive/video/upload/v1544581858/videos/DHDemo.mp4"
                    width="100%"
                    height="100%"
                />
            </div>
        )    
    }
}

const PlayerSizeAware = withSizeWrapper(Player);

class BasicVideo extends Component {
    state = {
        vidWidth: 0,
        vidHeight: 0
    }
    getPlayerSize = (sizeFromPlayer) => {
        this.setState({ vidHeight: sizeFromPlayer.height / 2});
        this.setState({ vidWidth: sizeFromPlayer.width});
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
            top: -this.state.vidHeight,
            width: '100%',
            height: '100%', // height needs to be a number that comes from state and child component
            backgroundColor: 'black',
        }
        return (
            <div style={bigassWrapper}>
                <div style={mover} className="mover">
                    <PlayerSizeAware triggerGetPlayerSize={this.getPlayerSize}/>
                    {/* <div style={{position:'absolute', top: '300px'}}>
                        <button onClick={this.props.toggleFullscreen}>Fullscreen</button>
                    </div> */}
                </div>
            </div>
        )
    }
}

const FullBasicVideo = Fullscreenable()(BasicVideo);
export default FullBasicVideo;