import { useEffect, useState } from "react";

import {
  AlertTriangle,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleDollarSign,
  TrendingUp,
  Wrench,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { sendChatMessage } from "./api/client";

import { ChatBox } from "./components/ChatBox";
import { DashboardLayout } from "./components/DashboardLayout";
import { InsightCard } from "./components/InsightCard";
import { MetricCard } from "./components/MetricCard";



type ActiveTab =
  | "dashboard"
  | "chat"
  | "insights";



interface Message {

  role:"user" | "assistant";

  content:string;

}



interface DashboardData {

  totalDeals:number;

  totalWorkOrders:number;

  dealStatusBreakdown:any;

}





function App(){



const [activeTab,setActiveTab]
=
useState<ActiveTab>("dashboard");



const [dashboardData,setDashboardData]
=
useState<DashboardData | null>(null);



const [question,setQuestion]
=
useState("");



const [isLoading,setIsLoading]
=
useState(false);



const [messages,setMessages]
=
useState<Message[]>([

{
role:"assistant",
content:
"I can analyze your business data and provide executive insights."
}

]);



const [insights,setInsights]
=
useState({

risks:[] as string[],

opportunities:[] as string[],

recommendations:[] as string[]

});




// ==========================
// DASHBOARD API
// ==========================


async function loadDashboard(){

try{


const response =
await fetch(
"https://monday-bi-agent-ogrh.onrender.com/api/dashboard"
);



const data =
await response.json();



console.log(
"FULL DASHBOARD RESPONSE:",
data
);



const metrics =
data.metrics;



setDashboardData({

totalDeals:
metrics.totalDeals || 0,


totalWorkOrders:
metrics.totalWorkOrders || 0,


dealStatusBreakdown:

metrics.dealStatusBreakdown ||
metrics.dealStatuses ||
{}

});



}

catch(error){

console.error(
"Dashboard Error:",
error
);

}


}





// ==========================
// INSIGHTS API
// ==========================


async function loadInsights(){

try{


const response =
await fetch(
"https://monday-bi-agent-ogrh.onrender.com/api/dashboard"
);



const data =
await response.json();



console.log(
"INSIGHTS:",
data
);



setInsights({

risks:

(data.insights?.risks || [])
.map(
(item:any)=>
`${item.risk || item.description || "Risk detected"} — Impact: ${item.impact || ""}`
),



opportunities:

(data.insights?.opportunities || [])
.map(
(item:any)=>
`${item.opportunity || item.description || "Opportunity detected"} — Impact: ${item.impact || ""}`
),



recommendations:

(data.insights?.recommendations || [])
.map(
(item:any)=>
`${item.recommendation || item.description || "Recommended action"} — Action: ${item.action || item.impact || ""}`
)

});



}

catch(error){

console.error(
"Insights Error:",
error
);

}

}





useEffect(()=>{

loadDashboard();

loadInsights();

},[]);







// ==========================
// CHAT
// ==========================


async function handleSend(text:string){


if(!text.trim())
return;



setMessages(prev=>[

...prev,

{
role:"user",
content:text
}

]);



setQuestion("");

setIsLoading(true);



try{


const response =
await sendChatMessage(text);



setMessages(prev=>[

...prev,

{
role:"assistant",
content:response.answer
}

]);



}

catch{


setMessages(prev=>[

...prev,

{
role:"assistant",
content:"AI service unavailable."
}

]);

}



finally{

setIsLoading(false);

}


}








// ==========================
// METRIC CARDS
// ==========================


const metrics = dashboardData
?

[

{

title:"Total Deals",

value:String(
dashboardData.totalDeals
),

detail:"All opportunities",

icon:CircleDollarSign,

tone:"violet"

},



{

title:"Won Deals",

value:String(
dashboardData.dealStatusBreakdown?.["Won"] || 0
),

detail:"Successfully closed",

icon:TrendingUp,

tone:"emerald"

},



{

title:"Open Deals",

value:String(
dashboardData.dealStatusBreakdown?.["Open"] || 0
),

detail:"Need attention",

icon:BriefcaseBusiness,

tone:"cyan"

},



{

title:"Dead Deals",

value:String(
dashboardData.dealStatusBreakdown?.["Dead"] || 0
),

detail:"Lost opportunities",

icon:AlertTriangle,

tone:"amber"

},



{

title:"Work Orders",

value:String(
dashboardData.totalWorkOrders
),

detail:"Operations",

icon:Wrench,

tone:"violet"

}


]

: [];







const chartData = dashboardData

?

[

{
name:"Won",

value:
dashboardData.dealStatusBreakdown?.["Won"] || 0

},


{
name:"Open",

value:
dashboardData.dealStatusBreakdown?.["Open"] || 0

},


{
name:"Dead",

value:
dashboardData.dealStatusBreakdown?.["Dead"] || 0

},


{
name:"Hold",

value:
dashboardData.dealStatusBreakdown?.["On Hold"] || 0

}

]

: [];







const pageMeta = {

dashboard:{

title:"Executive Dashboard",

description:
"Live business intelligence dashboard."

},


chat:{

title:"AI Business Analyst",

description:
"Ask questions about your business."

},


insights:{

title:"Insights Panel",

description:
"AI generated risks and opportunities."

}


}[activeTab];






return (

<DashboardLayout

title={pageMeta.title}

description={pageMeta.description}

activeTab={activeTab}

onTabChange={setActiveTab}

>




{/* DASHBOARD */}

{

activeTab==="dashboard" &&


<div className="space-y-6">



<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">


{

metrics.map((metric:any)=>(

<MetricCard

key={metric.title}

{...metric}

/>

))

}


</div>





<div className="grid lg:grid-cols-2 gap-6">





<section className="
rounded-3xl
border
border-white/10
bg-slate-900/70
p-6
">


<h2 className="text-xl text-white mb-5">

Pipeline Overview

</h2>


<div className="h-80">


<ResponsiveContainer
width="100%"
height="100%"
>


<BarChart
data={chartData}
>


<CartesianGrid
stroke="rgba(255,255,255,.1)"
/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="value"

fill="#8b5cf6"

/>


</BarChart>


</ResponsiveContainer>


</div>


</section>







<section className="
rounded-3xl
border
border-white/10
bg-slate-900/70
p-6
">


<h2 className="text-xl text-white mb-5">

<AlertTriangle className="inline mr-2"/>

Executive Readout

</h2>



<div className="space-y-4">


<div className="rounded-xl bg-red-500/10 p-4 text-white">

⚠️

{dashboardData?.dealStatusBreakdown?.["Dead"] || 0}

dead deals require attention

</div>



<div className="rounded-xl bg-green-500/10 p-4 text-white">

✅

{dashboardData?.dealStatusBreakdown?.["Won"] || 0}

successful deals closed

</div>




<div className="rounded-xl bg-yellow-500/10 p-4 text-white">

🟡

{dashboardData?.dealStatusBreakdown?.["Open"] || 0}

open deals need follow-up

</div>


</div>


</section>




</div>


</div>

}







{/* CHAT */}

{

activeTab==="chat" &&


<ChatBox

messages={messages}

value={question}

onChange={setQuestion}

onSubmit={()=>handleSend(question)}

isLoading={isLoading}

quickQuestions={[

"Give me CEO summary",

"Which deals need attention?",

"What are biggest risks?"

]}


onSelectQuickQuestion={(q)=>
handleSend(q)
}


/>


}







{/* INSIGHTS */}

{

activeTab==="insights" &&


<div className="grid lg:grid-cols-3 gap-5">


<InsightCard

title="Risks"

description="AI detected risks"

items={insights.risks}

tone="amber"

/>



<InsightCard

title="Opportunities"

description="AI detected opportunities"

items={insights.opportunities}

tone="emerald"

/>



<InsightCard

title="Recommendations"

description="AI suggested actions"

items={insights.recommendations}

tone="violet"

/>


</div>


}





</DashboardLayout>

);


}


export default App;