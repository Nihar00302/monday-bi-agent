interface InsightItem {
  description?: string;
  impact?: string;
  action?: string;
}

interface InsightCardProps {

  title: string;

  description: string;

  items: InsightItem[];

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
              p-4
              text-sm
              text-slate-300
              "

            >

              <p className="font-medium text-white">

                {item.description}

              </p>


              {
                item.impact && (

                  <p className="mt-2 text-xs text-amber-300">

                    Impact: {item.impact}

                  </p>

                )
              }


              {
                item.action && (

                  <p className="mt-2 text-xs text-emerald-300">

                    Action: {item.action}

                  </p>

                )
              }


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