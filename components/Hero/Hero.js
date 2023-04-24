
import React from 'react'
import styles from '../../styles/Hero.module.css'

const Hero = () => {        
    const [link, setLink] = React.useState('')
    const [resLink, setResLink] = React.useState('https://video.twimg.com/ext_tw_video/1547778885449707520/pu/vid/320x566/ZRiUXOvgiaYmC8tg.mp4')
    const downloadVideo = async() => {
        await fetch('https://vidownlive.com/api/tweet', {
            method: "post",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ link: link }) 
        }).then(res => res.json()).then(async(obj) =>{
            if(obj.found === true){
                download(obj.link)
            }else{
                alert("invalid url")
            }
        })
    }

    function download(link) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', link, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.target = '_blank';
            tag.download = 'sample.mp4';
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        };
        xhr.onerror = err => {
            alert('Failed to download video');
        };
        xhr.send();
    }
    return(
        <>
            <main className={styles.head}>
                <div className={styles.topBar}>
                    <img src='/logoP.png' style={{height: '80px', width: '80px'}} alt="logo" />
                    <div className={styles.logoName}>
                        <div className={styles.logoName1}>vidownlive</div>
                        <div className={styles.logoName2}>Get Video Anywhere</div>
                    </div>
                </div>
                <div className={styles.heading1}>Twitter Video Downloader</div>
                <div className={styles.inputContainer}>
                    <input value={link} onChange={(e) => setLink(e.target.value)} className={styles.input} type={"text"} placeholder="Paste Tweet link here" />
                    <button onClick={() => downloadVideo()} className={styles.button}>Download</button>
                </div>
                {/* <a href={resLink} download>Download</a> */}
            </main>
        </>
    )
}
export default Hero

//#95A1F1
//#02020