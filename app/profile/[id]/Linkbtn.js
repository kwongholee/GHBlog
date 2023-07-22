import Link from "next/link";

export default function LinkBtn(props) {
  let arr = [];
  for(let i = 1; i < (props.list.length / 10) + 1; i++) {
    arr.push(i);
  }

  return(
    <div>
      {
        arr.map((a, i) => {
          return(
            <Link href={'/'} key={i}>{a} </Link>
          )
        })
      }
    </div>
  )
}