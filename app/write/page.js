import style from './write.module.css'

export default function Write() {
  return(
    <div>
      <h1 style={{textAlign: 'center'}}>Write Page</h1>
      <form action="/api/post/new" method="POST">
        <div className={style.container}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <label style={{flex: 1}}>title</label>
            <input name="title" placeholder="title" className={style.titleInput} style={{flex: 'none'}} />
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <label style={{flex: 1}}>content</label>
            <textarea name="content" placeholder="content" cols={100} rows={20} className={style.contentInput} style={{flex: 'none'}} />
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button type="submit" className={style.inputBtn}>작성 완료</button>
          </div>
        </div>
      </form>
    </div>
  )
}