import React from 'react';
import './DownloadBtn.scss';

const DownloadBtn = ({ chosenGroups }) => (
    <button
        className="download-btn"
        onClick={() => window.alert('daunloud')}
        disabled={chosenGroups.length === 0}
    >
        Download
    </button>
);

export default DownloadBtn;
