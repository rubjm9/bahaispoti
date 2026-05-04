'use client';

import { useRouter } from "next/navigation";
import * as Icons from '../icons';

function NextPageBtn() {
    const router = useRouter();

    return (
            <button className="NextBtn" onClick={() => {
                router.forward();
            }}>
                <Icons.Nextpage />
            </button>
    );
}
  
export default NextPageBtn;