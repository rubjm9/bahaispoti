import { useNavigate } from "react-router-dom";
import * as Icons from '../icons';

function PrevPageBtn() {
    const navigate = useNavigate();

    return (
            <button className="PrevBtn" onClick={() => {
                navigate(-1); // goBack equivalent
            }}>
                <Icons.Prevpage />
            </button>
    );
}
  
export default PrevPageBtn;