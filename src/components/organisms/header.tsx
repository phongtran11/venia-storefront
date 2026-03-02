import { query } from "@/lib/apollo"
import { StoreCurrency, StoreView } from "@/components/molecules"
import { Separator } from "@/components/ui"
import { GET_STORE_CONFIG } from "@/graphql"
import { getCookie } from "@/lib/cookie"

export async function Header() {
    const storeConfig = await query({
        query: GET_STORE_CONFIG
    })

    const [storeCookie, currencyCookie] = await Promise.all([
        getCookie("store"),
        getCookie("currency")
    ])

    return <div className="flex items-center justify-end bg-accent">
        <StoreView
            availableStores={storeConfig.data?.availableStores}
            currentStore={storeCookie}
        />
        <Separator orientation="vertical" className="h-4! bg-foreground" />
        <StoreCurrency
            currency={storeConfig.data?.currency}
            currentCurrency={currencyCookie}
        />
    </div>
}