'use client';
import { useEffect } from "react"
import './copyBlock.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CopyBlock() {
    useEffect(() => {
        // Add copy buttons to all pre code blocks
        const codeBlocks = document.querySelectorAll('pre');
        codeBlocks.forEach(codeBlock => {
            const copyButton = document.createElement('div');
            copyButton.className = 'copy-button';

            copyButton.innerHTML = '点击复制'
            copyButton.addEventListener('click', () => {
                const preCode = codeBlock.textContent;
                // 删除最后一行代码
                const lastLineIndex = preCode?.lastIndexOf('\n');
                const code = preCode?.substring(0, lastLineIndex);
                copyTextToClipboard(code || '');
                toast.success('复制成功', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000
                });
            });

            codeBlock.appendChild(copyButton);
        });

        // Copy text to clipboard using Clipboard API
        function copyTextToClipboard(text: string) {
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = text;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);
        }
    }, [])
    return <>
        <ToastContainer />
    </>
}