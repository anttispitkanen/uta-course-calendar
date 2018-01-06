import React from 'react';
import './DownloadBtn.scss';

const DownloadBtn = () => (
    <button
        className="download-btn"
        onClick={() => window.alert('daunloud')}
        disabled={true}
    >
        Download
    </button>
);

export default DownloadBtn;
