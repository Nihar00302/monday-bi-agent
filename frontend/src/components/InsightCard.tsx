interface InsightCardProps {

  title: string;

  description: string;

  items: string[];

  tone:
  | "amber"
  | "emerald"
  | "violet";

}



export function InsightCard({
  title,
  description,
  items,
  tone
}: InsightCardProps) {


  const colors = {

    amber:
      "border-amber-400/20",

    emerald:
      "border-emerald-400/20",

    violet:
      "border-violet-400/20"

  };



  return (

    <div
      className={`
      rounded-3xl
      border
      ${colors[tone]}
      bg-slate-900/70
      p-6
      `}
    >


      <h2 className="text-xl font-semibold text-white">

        {title}

      </h2>



      <p className="mt-2 text-sm text-slate-400">

        {description}

      </p>





      <div className="mt-6 space-y-3">


        {
          items && items.length > 0 ?

          items.map((item,index)=>(


            <div

              key={index}

              className="
              rounded-xl
              bg-slate-950/60
              border
              border-white/10
              p-3
              text-sm
              text-slate-300
              "

            >

              {item}

            </div>


          ))

          :

          (

          <div className="text-sm text-slate-500">

            No insights available

          </div>

          )

        }


      </div>


    </div>

  );

}