import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Fullscreenable from 'react-fullscreenable';
import { withSize } from 'react-sizeme';

const withSizeWrapper = withSize({monitorHeight: true});

const Player = (props) => {
    const wrapper = {
        position: 'relative',
    };
    const { height, width } = props.size;
    console.log(props.size);
    return (
        <div style={wrapper}>
            <ReactPlayer 
            url="https://res.cloudinary.com/dance-hive/video/upload/v1544581858/videos/DHDemo.mp4"
            width="100%"
            height="100%"
            />
        </div>
    )
} 

const PlayerSizeAware = withSizeWrapper(Player);

class BasicVideo extends Component {
    render() {
        const bigassWrapper = {
            position: 'relative'        
        }
        return (
            <div style={bigassWrapper}>                
                <PlayerSizeAware />
                <div style={{position:'absolute', top: '300px'}}>
                    <button onClick={this.props.toggleFullscreen}>Fullscreen</button>
                </div>
            </div>
        )
    }
}

const FullBasicVideo = Fullscreenable()(BasicVideo);
export default FullBasicVideo;