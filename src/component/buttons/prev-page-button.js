'use client';

import { useRouter } from "next/navigation";
import * as Icons from '../icons';

function PrevPageBtn() {
    const router = useRouter();

    return (
            <button className="PrevBtn" onClick={() => {
                router.back();
            }}>
                <Icons.Prevpage />
            </button>
    );
}
  
export default PrevPageBtn;