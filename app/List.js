'use client'

import { faMedal, faPenToSquare, faTrashCan, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react"
import style from './page.module.css'

export default function List(props) {
    let router = useRouter();

    let [list, setList] = useState(props.copy);

    return(
        <div>
            <div className="bestList">
                <div className={style.centeredContainer}>
                    <FontAwesomeIcon icon={faTrophy} style={{color: "#f7e418",}} size="3x" />
                    <h1 className={style.bestListTitle}>Best 5</h1>
                    <FontAwesomeIcon icon={faTrophy} style={{color: "#f7e418",}} size="3x" />
                </div>
                {
                    list.map((a,i) => {
                        let colorList = ["#ede735", "#a6a6a6", "#63440d", "#af48f4", "#000000"];
                        return(
                            <div key={i}>
                                <div className="list-item" onClick={() => {router.push('/detail/' + a._id);}}>
                                    <FontAwesomeIcon icon={faMedal} beat style={{color: colorList[i],}} size="3x" />
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <h4 style={{marginRight: 'auto'}}>{a.title}</h4>
                                        <p style={{marginLeft: 'auto'}}>{a.date}</p>
                                    </div>
                                    <p>{a.writer}</p>
                                    <p style={{position: 'absolute', left: '1.5%'}}>👍: {a.like}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}