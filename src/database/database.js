import { createClient } from "@supabase/supabase-js";

const URL = process.env.REACT_APP_SUPABASE_URL;
const KEY = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(URL, KEY);

async function getIdeas() {
    const {data} = await supabase.from("ideas").select("*").eq("accepted", true);
    return data;
}

export { getIdeas };
