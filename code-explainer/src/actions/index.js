"use server";


export async function explain(prevState, formData) {
    const code = formData.get("code");
    const language = formData.get("language");

    console.log(`Generating explanation for ${language}`);

    try {
        // console.log(import.meta.env.VITE_API_BASE_URL);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/explain-code`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({code, language}),
    });
        
        //when res not okay
        if(!res.ok){
            return{
                success:false,
                error: `Failed to fetch the results`
            };
        }

        const data = await res.json();
        console.log("Response data from API:", data);
        


        
        //when res is ok
        return{
            success:true,
            data,
            error:null,
        };

    } catch (err) {
        return{
                success:false,
                error: `Error occured: ${err?.message}`,
            }
    };
}