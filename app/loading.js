import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return(
    <div>
      <FontAwesomeIcon icon={faSpinner} size="6x" style={{color: "#6fd11f"}} className="loadingRotation" />
      <h1 style={{marginLeft: '46.5%'}}>Loading</h1>
    </div>
  )
}