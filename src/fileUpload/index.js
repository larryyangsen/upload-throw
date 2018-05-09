import React, { Component } from 'react';
import Provider from './provider';
import Context from './context';
import FileItem from './file-item';
import './index.css'
export default class extends Component {
    render() {
        return (
            <Provider>
                <Context.Consumer>
                    {({ files }) => (
                        <ul>
                            {files.map((file, i) => (
                                <FileItem key={i} name={file.name} size={file.size} type={file.type} />
                            ))}
                        </ul>
                    )}
                </Context.Consumer>
            </Provider>
        );
    }
}
