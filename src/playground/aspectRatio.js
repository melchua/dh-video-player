import React, { Component } from 'react';
import Fullscreenable from 'react-fullscreenable';
import ReactPlayer from 'react-player';
import sizeMe from 'react-sizeme';


export class Demo extends Component {
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
        const changingHeight = height / 2 * -1;
        const aspectRatioBox = {
            backgroundColor: 'red',
            width: '100%',
            height: '0',
            paddingTop: 'calc(443 / 792 * 100%)',
            position: 'relative',
            overflow: 'hidden',
            top: changingHeight
        }

        const boxCutter = {
            position: 'absolute',
            top: -changingHeight,
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'green'
        }

        const textOverlay = {
            position: 'absolute',
            top: '0',
            left: '50vw',
            color: 'white'
        }

        return (               
            <div style={aspectRatioBox} className="playerBox">
                <div style={boxCutter}>
                    <ReactPlayer 
                        url="https://s3-us-west-2.amazonaws.com/dancehive-videos/full.mp4"
                        width="100%"
                        height="100%"
                    />
                    <div style={textOverlay}>
                        { width } x { height }
                        {toggleButton}
                    </div>
                </div>

            </div>
        );
    }
}

const AspectVideo = Fullscreenable()(Demo);

export default sizeMe({ monitorHeight: true })(AspectVideo);