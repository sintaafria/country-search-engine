"use client"
import Search from "@/app/(components)/molecules/search";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Home() {

	const router = useRouter()
	const [keyword, setKeyword] = useState("")
	const [result, setResult] = useState([])
	const [loading, setLoading] = useState(false)

	const getCountries = useCallback(
		debounce(async(name) => {
			const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
			if(res.ok){
				const data = await res.json()
				setResult(data?.slice(0,5)?.map(i => ({name: i?.name?.common})))
			}else{
				setResult([])
			}
			setLoading(false)
		}, 1000),
		[]
	);

	useEffect(() => {
		if(keyword.length) {
			setLoading(true)
			getCountries(keyword)
		}else setResult([])
	}, [keyword])

	return (
		<div className="flex-item-center flex-col gap-[41px] min-h-screen">
			<h1 className="text-7xl font-bold">Country</h1>
			<div className="w-[700px]">
				<Search
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					result={result}
					loading={loading}
					onClick={(e) => router.push(`result/${e.name}`)}
				/>
			</div>
		</div>
	);
}
