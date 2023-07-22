export default function Write() {
  return(
    <div>
      <h1>Write Page</h1>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="title" style={{width: '20%'}} />
        <textarea name="content" placeholder="content" cols={100} rows={20} style={{display: 'block'}} />
        <button type="submit">작성 완료</button>
      </form>
    </div>
  )
}