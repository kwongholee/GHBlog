import Link from "next/link";

export default function Linkbtn(props) {
  var list = [];
  for(let i = 1; i < (props.result.length / 10) + 1; i++) {
    list.push(i);
  }

  return(
    <div>
      {
        list.map((a, i) => {
          return(
            <Link href={'/list/' + a} key={i}>{a} </Link>
          )
        })
      }
    </div>
  )  
}