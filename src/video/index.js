import React, { Component } from 'react';
import axios from 'axios';

import Context from './context';
import Provider from './provider';
import VideoContent from './video-content';
class video extends Component {
    upload = async file => {
        const video = new File([file.data], `${file.id}.webm`, {
            type: 'video/webm'
        });
        const config = {
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                console.log(percentCompleted);
            },
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const data = new FormData();
        data.append('file', video);
        return axios.post(`${window.location.origin}/api/upload`, data, config);
    };
    render() {
        return (
            <Provider>
                <Context.Consumer>
                    {({ files }) => (
                        <div>
                            {files.map((file, i) => (
                                <VideoContent key={i} file={file} upload={() => this.upload(file)} />
                            ))}
                        </div>
                    )}
                </Context.Consumer>
            </Provider>
        );
    }
}

export default video;
