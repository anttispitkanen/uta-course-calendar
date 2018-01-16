import React from 'react';

/* Link helper component */
export const A = ({ href, className, children }) => (
    <a href={href} className={className} target="_blank" rel="noopener noreferer">
        { children }
    </a>
);
