const express = require("express");
const router = express.Router();

const { fetchMondayData } = require("./monday");
const { askGroq } = require("./groq");


// -----------------------------
// HEALTH CHECK
// -----------------------------

router.get("/health", (req, res) => {

    res.json({
        success:true,
        message:"🚀 Monday BI Agent API is running"
    });

});




// -----------------------------
// CREATE BUSINESS SUMMARY
// -----------------------------

function createBusinessSummary(rawData){


    const deals =
        rawData.deals?.items_page?.items || [];


    const workOrders =
        rawData.workOrders?.items_page?.items || [];



    const dealStatuses = {};



    deals.forEach((deal)=>{


        let status = "Unknown";


        if(deal.column_values){


            const statusColumn =
                deal.column_values.find(
                    col =>
                    (
                        col.column?.title ||
                        col.id ||
                        ""
                    )
                    .toLowerCase()
                    .includes("status")
                );



            if(statusColumn){

    const value =
        statusColumn.text?.trim() || "";


    const invalidStatuses = [
        "Deal Status",
        "Status",
        ""
    ];


    if(
        value &&
        !invalidStatuses.includes(value) &&
        !value.includes("{")
    ){

        status = value;

    }

}


        }



        dealStatuses[status] =
            (dealStatuses[status] || 0) + 1;


    });




    delete dealStatuses["Unknown"];
    const summary = {


        totalDeals: deals.length,


        totalWorkOrders: workOrders.length,



        dealStatuses,



        importantMetrics:{


            wonDeals:
                dealStatuses["Won"] || 0,


            openDeals:
                dealStatuses["Open"] || 0,


            deadDeals:
                dealStatuses["Dead"] || 0,


            onHoldDeals:
                dealStatuses["On Hold"] || 0

        }


    };



    console.log(
        "SUMMARY SENT TO AI:",
        JSON.stringify(summary,null,2)
    );



    return summary;

}







// -----------------------------
// DASHBOARD API
// -----------------------------

router.get("/dashboard", async(req,res)=>{


    try{


        const rawData =
            await fetchMondayData();



        const summary =
            createBusinessSummary(rawData);



        res.json({

            success:true,

            metrics:summary

        });



    }
    catch(error){


        console.error(
            "Dashboard Error:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


});







// -----------------------------
// AI INSIGHTS API
// -----------------------------

router.get("/insights", async(req,res)=>{


    try{


        const rawData =
            await fetchMondayData();



        const summary =
            createBusinessSummary(rawData);





        const prompt = `


You are a senior Business Intelligence Analyst.


Analyze this company data.


Rules:

- Compare numbers correctly.
- Never say a smaller number is bigger.
- Focus only on business impact.
- Do not mention sample data.
- Do not mention duplicate names.
- Give actionable executive insights.


Return ONLY valid JSON:

{
 "risks":[],
 "opportunities":[],
 "recommendations":[]
}



Business Data:

${JSON.stringify(summary,null,2)}

`;





        const answer =
            await askGroq(
                prompt,
                summary
            );





        let insights;



        try{


            insights =
                JSON.parse(answer);



        }
        catch{


            insights={

                risks:[
                    answer
                ],

                opportunities:[],

                recommendations:[]

            };


        }





        res.json({

            success:true,

            insights

        });





    }
    catch(error){


        console.error(
            "Insights Error:",
            error
        );



        res.status(500).json({

            success:false,

            message:error.message

        });


    }


});








// -----------------------------
// CHAT API
// -----------------------------

router.post("/chat", async(req,res)=>{


    try{


        const {
            question
        } = req.body;



        if(!question){


            return res.status(400).json({

                success:false,

                message:"Question required"

            });


        }




        const rawData =
            await fetchMondayData();



        const summary =
            createBusinessSummary(rawData);





        const answer =
            await askGroq(
                question,
                summary
            );





        res.json({

            success:true,

            question,

            answer

        });



    }
    catch(error){


        console.error(
            "Chat Error:",
            error
        );



        res.status(500).json({

            success:false,

            message:error.message

        });


    }


});





module.exports = router;