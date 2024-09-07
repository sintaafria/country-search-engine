"use client";
import Input from "@/app/(components)/atoms/input";
import Spinner from "@/app/(components)/atoms/spinner";
import React from "react";

export default function Search({
    value='',
    result=[],
    loading=false,
    onChange = () => void undefined,
    onClick = () => void undefined
}) {
	return (
		<div className="relative">
            <Input onChange={onChange} value={value} fluid={true}/>
            <div 
                className="w-full absolute top-[calc(100%+12px)] bg-white shadow py-1 rounded-[5px]" 
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
                            <p className="text-danger px-[26px] py-[9px]">
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
