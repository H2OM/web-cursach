import {headers} from "next/headers";

export default async function GET_DATA({controller, action, cache= "no-cache"}) {

    const host = headers().get('x-forwarded-proto') + "://" + headers().get('x-forwarded-host');

    return await fetch(`${host}/api/${controller}/${action}`, {method: "GET", cache: cache})
        .then(data=>{
            if(!data.ok) {
                return false;
            }
            return data.json();
        }).catch(()=>false);
}