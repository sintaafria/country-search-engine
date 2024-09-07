"use client";
import Button from "@/app/(components)/atoms/button";
import Spinner from "@/app/(components)/atoms/spinner";
import Tag from "@/app/(components)/atoms/tag";
import Tooltip from "@/app/(components)/atoms/tooltip";
import NotFound from "@/app/not-found";
import { getCallingCode, getCurrency } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Result({ params }) {
	const [data, setData] = useState(null);
	const [sameCallCode, setSameCallCode] = useState([]);
	const [sameCurrency, setSameCurrency] = useState([]);
	const [loading, setLoading] = useState(true);

	const getCountry = async name => {
		const res = await fetch(
			`https://restcountries.com/v3.1/name/${name}?fullText=true`
		);
		if (res.ok) {
			const data = await res.json();
			setData(data[0]);
		} else {
			setData(null);
			setLoading(false);
		}
	};

	const getSameCallingCode = async code => {
		const res = await fetch(
			`https://restcountries.com/v2/callingcode/${code}`
		);
		if (res.ok) {
			const data = await res.json();
			setSameCallCode(data);
		} else setSameCallCode([]);
	};

	const getSameCurrency = async currency => {
		const res = await fetch(
			`https://restcountries.com/v2/currency/${currency}`
		);
		if (res.ok) {
			const data = await res.json();
			setSameCurrency(data);
		} else setSameCurrency([]);
	};

	useEffect(() => {
		getCountry(params.country);
	}, []);

	useEffect(() => {
		if (data) {
			Promise.all([
				getSameCallingCode(getCallingCode(data)),
				getSameCurrency(getCurrency(data)),
			]).then(() => setLoading(false));
		}
	}, [data]);

	const TooltipContent = ({ content }) => {
		return (
			<ul className="text-left max-h-[228px] px-[20px]">
				{content?.map((i, idx) => (
					<li className="py-[9px] cursor-pointer" key={idx}>
						{i.name}
					</li>
				))}
			</ul>
		);
	};

	return (
		<>
			{!loading ? (
				data ? (
					<div className="p-[90px]">
						<Link href="/">
							<Button>
								<p>
									<span className="icon-arrow-left mr-3"></span>
									<span>Back to Homepage</span>
								</p>
							</Button>
						</Link>
						<div className="flex gap-[10px] mt-[50px]">
							<h2 className="text-5xl font-bold">
								{data?.name?.common}
							</h2>
							<Image
								src={data?.flags?.svg}
								alt={data?.alt || ""}
								height={30}
								width={46}
							/>
						</div>
						<div className="flex gap-[5px] mt-2">
							{data?.altSpellings?.map((i, idx) => (
								<Tag key={idx}>{i}</Tag>
							))}
						</div>
						<div className="grid grid-cols-3 gap-3 mt-[25px]">
							<div className="p-[25px] rounded-[5px] shadow bg-[url('/images/globe.svg')] bg-no-repeat bg-right-bottom">
								<p className="font-medium mb-3">LatLong</p>
								<h2 className="text-[#8362F2] text-5xl font-bold">
									{`${data?.latlng[0].toFixed(
										1
									)}, ${data?.latlng[1].toFixed(1)}`}
								</h2>
							</div>
							<div className="p-[25px] rounded-[5px] shadow">
								<ul className="grid grid-row gap-2">
									<p>
										<span>Capital: </span>
										<span className="font-medium"></span>
										{data?.capital}
									</p>
									<p>
										<span>Region: </span>
										<span className="font-medium">
											{data?.region}
										</span>
									</p>
									<p>
										<span>Subregion: </span>
										<span className="font-medium">
											{data?.subregion}
										</span>
									</p>
								</ul>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-3 mt-[25px]">
							<div className="font-medium grid grid-row gap-[5px]">
								<p className="text-lg font-medium">
									Calling Code
								</p>
								<h2 className="text-[#8362F2] text-5xl font-bold">
									{getCallingCode(data)}
								</h2>
								<div className="text-sm inline">
									<Tooltip
										content={
											<TooltipContent
												content={sameCallCode}
											/>
										}
										className="text-[#8362F2] underline underline-offset-4"
									>
										{`${sameCallCode.length} country`}
									</Tooltip>
									<span> country with this calling code</span>
								</div>
							</div>
							<div className="font-medium grid grid-row gap-[5px]">
								<p className="text-lg font-medium">Currency</p>
								<h2 className="text-[#8362F2] text-5xl font-bold">
									{getCurrency(data)}
								</h2>
								<div className="text-sm inline">
									<Tooltip
										content={
											<TooltipContent
												content={sameCurrency}
											/>
										}
										className="text-[#8362F2] underline underline-offset-4"
									>
										{`${sameCurrency.length} country`}
									</Tooltip>
									<span> with this currency</span>
								</div>
							</div>
						</div>
					</div>
				) : (
					<NotFound />
				)
			) : (
				<div className="flex items-center justify-center h-screen">
					<Spinner size={48} />
				</div>
			)}
		</>
	);
}
