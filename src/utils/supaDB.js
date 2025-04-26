import { createClient } from "@supabase/supabase-js";

const supaURL = process.env.REACT_APP_SUPA_URL
const supaKEY = process.env.REACT_APP_SUPA_KEY


const supabase = createClient(supaURL, supaKEY)


export async function CreateData (table, myData) {
    const { data, error } = await supabase
        .from(table)
        .insert([myData])
        alert("Data Added successfully.")

    if (error) return console.log(`There is a error at`, error)
}


export async function ReadData (table) {
    const { data, error } = await supabase
        .from(table)
        .select("*")

    if (error) return console.log(`There is a error at ${error}`)

} 