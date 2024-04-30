import Catalog from "@/components/catalog/server/Catalog";


export default function Page ({searchParams}) {
    
    return <Catalog searchParams={searchParams}/>     
}