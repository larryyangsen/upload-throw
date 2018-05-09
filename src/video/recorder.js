import RecordRTC from 'recordrtc';

const media = async () => {
    navigator.getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    return stream;
};

export default async () => {
    const stream = await media();
    const recorder = RecordRTC(stream, { type: 'video' });
    const src = URL.createObjectURL(stream);
    return { src, recorder };
};
