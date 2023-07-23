'use client' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa2, faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import style from './page.module.css'

export default function Mainpage() {
  return(
    <div>
      <h3 className={style.title}>Welcome to GHBLOG</h3>
      <FontAwesomeIcon icon={faAnglesDown} size='5x' className={style.titleArrow} />
      {/* <p className={style.comment1}>My Name is KwonghoLee</p>
      <p className={style.comment2}>Want To Use My Blog?</p> */}
    </div>
  )
}