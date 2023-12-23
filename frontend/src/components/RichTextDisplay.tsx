import React from 'react'

const decodeHtml = (html: string): string => {
    const area = document.createElement('textarea');
    area.innerHTML = html;
    return area.value;
}

const RichTextDisplay = ({ htmlContent }) => {
    const textArea = decodeHtml(htmlContent);
    return (
    <div className='border p-4'>
        <div dangerouslySetInnerHTML={{ __html: textArea }} />
    </div>
    )
}

export default RichTextDisplay