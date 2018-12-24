import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styled, { css } from 'styled-components';
import Slider from '@material-ui/lab/Slider';

const Dropdown = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    color: white;
`

const DropdownContainer = styled.div`
    display: none;
    position: absolute;
    bottom: 40px;
    height: 80px;
    background-color: grey;
    z-index: 1;
    /* min-width: 20px; */
    padding: 20px;
    ${Dropdown}:hover & {
        display: inline-block;
    };
`

class SpeedControl extends Component {
    state = {
        level: 1
    };
    handleSliderValueChange = (e, value) => {
        this.setState({ level: value});
        console.log('on change value: ', value);
        // this.child.playerRef.current.seekTo(parseFloat(value));
    }
    render() {
        return(
            <Dropdown>
                <DropdownContainer>
                    <Slider
                        value={this.state.level}
                        aria-labelledby="speed"
                        vertical
                        onChange={this.handleSliderValueChange}
                        min={-2}
                        max={2}
                        height="100%"
                    />
                </DropdownContainer>
                <Button onClick="" style={{color: 'white', padding: '0'}}>{this.state.level.toFixed(2)}X</Button>
            </Dropdown>
        );
    }
}
export default SpeedControl;