import { useNavigate } from "react-router-dom";
import * as Icons from '../icons';

function NextPageBtn() {
    const navigate = useNavigate();

    return (
            <button className="NextBtn" onClick={() => {
                navigate(1); // goForward equivalent
            }}>
                <Icons.Nextpage />
            </button>
    );
}
  
export default NextPageBtn;