import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Fullscreenable from 'react-fullscreenable';
import { withSize } from 'react-sizeme';

const withSizeWrapper = withSize({monitorHeight: true});

const Player = (props) => {

    const { height, width } = props.size;

    const wrapper = {
        // position: 'relative'
    };
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
    state = {
        vidWidth: '',
        vidHeight: ''
    }

    handleHeightChange = () => {
        
    }
    render() {
        const bigassWrapper = {
            position: 'relative',
            height: '100%',
            width: '100%',
            // overflow: 'hidden'       
        }
        const mover = {
            position: 'absolute',
            top: '-100px',
            width: '100%',
            height: '100%', // height needs to be a number that comes from state and child component
            backgroundColor: 'black',
        }
        return (
            <div style={bigassWrapper}>    
                <div style={mover} className="mover">            
                    <PlayerSizeAware />
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