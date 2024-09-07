"use client";
import Spinner from "@/app/(components)/atoms/spinner";
import React from "react";

export default function Search({
    fluid = false,
    value='',
    result=[],
    loading=false,
    onChange = () => void undefined,
    onClick = () => void undefined
}) {
	return (
		<div className="relative">
            <div className="relative">
                <label 
                    htmlFor="search"
                    className="icon-magnify absolute top-1/2 right-3 -translate-y-1/2 text-[#C8C8C8] text-[22px]"
                ></label>
                <input
                    id='search'
                    className="border-solid border-[0.5px] border-[#C8C8C8] rounded-[10px] pl-4 pr-9 py-3
                    active:border hover:border hover:border-[#8362F280] active:outline focus:outline outline-2 outline-[#8362F2]"
                    placeholder="Type any country name"
                    style={{width: fluid ? "100%" : "unset"}}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div 
                className="absolute top-[calc(100%+12px)] bg-white shadow py-1 rounded-[5px]" 
                style={{width: fluid ? "100%" : "unset"}}
                hidden={!value.length}
            >
                {
                    !loading ?
                    <>
                        { 
                            value.length && result.length ?
                            <ul className="max-h-[228px] overflow-auto">
                                {
                                    result?.map((i, idx) =>
                                        <li
                                            className="px-[26px] py-[9px] cursor-pointer hover:bg-[#F4F4F4]" 
                                            key={idx}
                                            onClick={() => onClick(i)}
                                        >
                                            {i.name}
                                        </li>
                                    )
                                }
                            </ul>:
                            <p className="text-[#FF0000] px-[26px] py-[9px]">
                                Data not found
                            </p>
                        }
                    </>:
                    <div className="flex justify-center">
                        <Spinner/>
                    </div>
                }
            </div>
		</div>
	);
}
