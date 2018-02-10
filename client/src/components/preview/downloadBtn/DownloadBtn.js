import React from 'react';
import './DownloadBtn.scss';

const DownloadBtn = ({ chosenGroups, sendForDownload }) => (
    <button
        id="download-btn"
        className="download-btn"
        onClick={() => sendForDownload()}
        disabled={chosenGroups.length === 0}
    >
        Download
    </button>
);

export default DownloadBtn;
