'use client' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import style from './introduce.module.css'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import introduce from '/public/introduceMe.jpeg'
import NEXTJS from '/public/nextJSframework.png'
import smile from '/public/smile.jpeg'

export default function Content() {
  // let [count, setCount] = useState(0);

  // useEffect(() => {
  //   let observer = new IntersectionObserver((e) => {
  //     e.forEach((a) => {
  //       if(a.isIntersecting) {
  //         a.target.style.animation = 'titleChange 1.5s';
  //       } else {
  //         a.target.style.animation = 'titleDisappear 1.5s';
  //       }
  //     })
  //   });
  //   observer.observe(document.getElementById('first'))
  //   setCount(1);
  //   return() => {
  //     setCount(0);
  //   }
  // }, [count]);
  
  return(
    <div>
      <div>
        <h3 id='first' className={style.title}>Welcome to GHBLOG</h3>
        <FontAwesomeIcon id='second' icon={faAnglesDown} size='5x' className={style.titleArrow} />
      </div>

      <div>
        <div className={style.comment1}>My Name is 이광호</div>
        <Image src={introduce} width={1000} className={style.comment1Image} />
      </div>

      <div>
        <div className={style.comment2}>I made this blog with NEXT.JS</div>
        <Image src={NEXTJS} width={1000} className={style.comment2Image} />
      </div>

      <div>
        <div className={style.comment3}>왜 영어쓰냐고요?</div>
      </div>

      <div>
        <Image src={smile} width={1000} className={style.comment4Image} />
        <div className={style.comment4}>이러면 좀 있어보이자나요</div>
      </div>
    </div>
  )
}