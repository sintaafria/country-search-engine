import React from "react";

export default function Tag({children}) {
	return(
        <div className="text-white text-xs font-bold px-4 py-[5px] rounded-[50px] bg-secondary">
            {children}
        </div>
    );
}
