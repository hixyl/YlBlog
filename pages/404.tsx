import Link from 'next/link'
import './404.css'
export default function Custom404() {
    const goBack = () => {
        window.history.back()
    }
    return (
        <div className='not-found-body'>
            <p className='not-found-title'>页面不存在: 404 Not Found</p>
            <div className='back-btn' onClick={goBack}>返回</div>
        </div>
    )
}