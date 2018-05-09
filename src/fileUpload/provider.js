import React, { Component } from 'react';
import Context from './context';
import Dropzone from 'react-dropzone';
import axios from 'axios';
export default class extends Component {
    state = {
        files: []
    };
    onDrop = files => {
        console.log(files);
        const config = {
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                console.log(percentCompleted);
            },
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const promises = files.map((file, i) => {
            const data = new FormData();
            data.append('file', file);
            return axios.post(`${window.location.origin}/api/upload`, data, config);
        });
        axios
            .all(promises)
            .then(res => {
                this.setState({
                    files
                });
            })
            .catch(err => {
                console.error(err);
            });
    };

    render() {
        return (
            <Context.Provider value={{ ...this.state }}>
                <div>
                    <Dropzone onDrop={this.onDrop}>
                        <p>Drop files here</p>
                    </Dropzone>
                    {this.props.children}
                </div>
            </Context.Provider>
        );
    }
}
