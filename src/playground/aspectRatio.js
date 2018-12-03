import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fullscreenable from 'react-fullscreenable';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player';


export class Demo extends Component {
    componentDidMount() {
        var width = document.getElementById('foo').offsetWidth; 
        console.log(width);
    }
    render() {
        const aspectRatioBox = {
            backgroundColor: 'red',
            width: '100%',
            height: '0',
            paddingTop: 'calc(443 / 792 * 100%)',
            position: 'relative',
            overflow: 'hidden'
        }

        const boxCutter = {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'green'
        }

        const aspectRatioBoxInside = {
            width: '100%',
            height: '100%',
            backgroundColor: 'black'
        }
        return (               
            <div style={aspectRatioBox} className="playerBox">
                <div style={boxCutter}>
                    <ReactPlayer 
                        style={aspectRatioBoxInside}
                        url="https://s3-us-west-2.amazonaws.com/dancehive-videos/full.mp4"
                        width="100%"
                        height="100%"
                    />
                </div>
               <h1 id="foo">test foo</h1>
            </div>
        );
    }
}

const AspectVideo = Fullscreenable()(Demo);

export default AspectVideo;