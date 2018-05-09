import React, { Component } from 'react';
import Context from './context';
import Recorder from './recorder';
class VideoProvider extends Component {
    state = {
        files: [],
        src: null,
        recorder: null
    };
    constructor() {
        super(...arguments);
    }
    startRecord = () => {
        this.state.recorder.startRecording();
    };
    stopRecord = () => {
        this.state.recorder.stopRecording(() => {
            const { files } = this.state;
            console.log(files);
            files.push({
                id: new Date().getTime(),
                state: this.state.recorder.getState(),
                data: this.state.recorder.getBlob()
            });
            this.setState({ files });
        });
    };
    render() {
        return (
            <Context.Provider value={{ files: this.state.files }}>
                <div>
                    <button onClick={this.startRecord}>Start Record</button>
                    <button onClick={this.stopRecord}>Stop Record</button>
                    <video width="360" autoPlay src={this.state.src} />
                    {this.props.children}
                </div>
            </Context.Provider>
        );
    }

    async componentWillMount() {
        const { src, recorder } = await Recorder();
        this.setState({ src, recorder });
    }
}

export default VideoProvider;
