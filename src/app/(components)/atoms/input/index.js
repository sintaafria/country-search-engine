import React from "react";
import "./style.css"

export default function Input({
    fluid,
    value,
    onChange = () => void undefined
}) {
	return (
		<div className="relative">
			<label
				htmlFor="search"
				className="icon-magnify absolute top-1/2 right-3 -translate-y-1/2 text-[22px]"
			></label>
			<input
				id="search"
				className="styled-input"
				placeholder="Type any country name"
				style={{ width: fluid ? "100%" : "unset" }}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
