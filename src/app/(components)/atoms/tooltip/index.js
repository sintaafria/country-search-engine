import React from "react";
import "./style.css"

export default function Tooltip({content, className='', children}) {
	return (
		<div className="tooltip">
            <div className={className}>
			    {children}
            </div>
			<div className={`tooltip-text`}>
                {content}
            </div>
		</div>
	);
}
