const Groq = require("groq-sdk");


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});



async function askGroq(question, businessData = null) {


    let prompt;



    // If businessData exists → normal chat
    if (businessData) {


        prompt = `

You are an AI Business Intelligence Agent.


Use ONLY the business data provided below.


Business Data:

${JSON.stringify(businessData, null, 2)}



User Question:

${question}



Instructions:

- Answer like a founder's BI analyst.
- Give insights, not just raw numbers.
- Mention missing or incomplete data.
- Use Deals and Work Orders when relevant.

`;



    } 
    
    // If only prompt is sent → insights generation
    else {


        prompt = question;


    }






    const response = await groq.chat.completions.create({


        model:"llama-3.1-8b-instant",



        messages:[

            {
                role:"user",
                content:prompt
            }

        ],



        temperature:0.2


    });





    return response
        .choices[0]
        .message
        .content;


}





module.exports = {

    askGroq

};