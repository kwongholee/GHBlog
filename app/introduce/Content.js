'use client' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import style from './introduce.module.css'
import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import introduce from '/public/introduceMe.jpeg'
import NEXTJS from '/public/nextJSframework.png'
import smile from '/public/smile.jpeg'

export default function Content() {
  const target = useRef(null)
  useEffect(() => {
    let observer;
    if(target.current) {
      observer = new IntersectionObserver(([e]) => {
        const targetElement = e.target;
        if(e.isIntersecting) {
          targetElement.style.animation = 'titleChange 1.5s';
        } else {
          targetElement.style.animation = 'titleDisappear 1.5s';
        }
      }, {threshold: 0});
      observer.observe(target.current)
      console.log('IntersectionObserver is observing:', target.current);
    }
  }, [target]);
  
  return(
    <div>
      <div>
        <h3 id='first' className={style.title}>Welcome to GHBLOG</h3>
        <FontAwesomeIcon id='second' icon={faAnglesDown} size='5x' className={style.titleArrow} />
      </div>

      <div>
        <div className={style.comment1}>My Name is 이광호</div>
        <Image src={introduce} width={1000} className={style.comment1Image} alt='핑구' />
      </div>

      <div>
        <div className={style.comment2}>I made this blog with NEXT.JS</div>
        <Image src={NEXTJS} width={1000} className={style.comment2Image} alt='nextjs' />
      </div>

      <div>
        <div className={style.comment3}>왜 영어쓰냐고요?</div>
      </div>

      <div>
        <Image src={smile} width={1000} className={style.comment4Image} alt='뿌듯' />
        <div className={style.comment4}>이러면 좀 있어보이자나요</div>
      </div>
    </div>
  )
}