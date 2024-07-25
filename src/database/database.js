import { createClient } from "@supabase/supabase-js";

const URL = process.env.REACT_APP_SUPABASE_URL;
const KEY = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(URL, KEY);

async function getIdeas() {
    let {data, error} = await supabase.from("ideas").select("*").eq("accepted", true);

    if (error) return error;

    return data;
}

async function userSignUp(user) {
    let {data, error} = await supabase.auth.signUp({
        email: user.email,
        password: user.password
    });

    if (error) return error;

    return data;
}

async function userLogin(user) {
    let {data, error} = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password
    });

    if (error) return error;

    return data;
}

async function passwordRecovery(email) {
    let {data, error} = await supabase.auth.api.resetPasswordForEmail(email);

    if (error) return error;

    return data;
}

async function getUser() {
    const {data: {user}} = await supabase.auth.getUser();
    return user;
}

export { getIdeas, userSignUp, userLogin, passwordRecovery, getUser };
