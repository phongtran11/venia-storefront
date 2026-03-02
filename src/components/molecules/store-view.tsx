"use client"

import { GetStoreConfigQuery } from "@/gql/graphql"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { setStoreAction } from "@/lib/actions/store-actions"
import { useEffect, useState } from "react"


export function StoreView({ availableStores, currentStore }: GetStoreConfigQuery & { currentStore?: string }) {
    const [mounted, setMounted] = useState(false)

    const activeStore = availableStores?.find((store) => store?.store_code === currentStore)
        || availableStores?.find((store) => store?.is_default_store)

    const handleValueChange = async (value: string) => {
        await setStoreAction(value)
    }


    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="h-9 px-3 py-2 text-sm flex items-center">
                {activeStore?.store_name}
            </div>
        )
    }

    return (
        <Select onValueChange={handleValueChange} defaultValue={activeStore?.store_code || ''}>
            <SelectTrigger className="border-none shadow-none focus-visible:ring-0 [&>_svg]:hidden">
                <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    {availableStores?.map((store) => (
                        <SelectItem key={store?.store_code} value={store?.store_code || ''}>
                            {store?.store_name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}