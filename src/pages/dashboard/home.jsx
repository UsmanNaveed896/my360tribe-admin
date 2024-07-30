import React, { useContext, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsCardsData, statisticsChartsData } from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useGetUsersHook } from "@/hooks/useGetUsersHook";
import { useGetConciergeHook } from "@/hooks/useGetConciergeHook";
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";
import { useGetPeerAmbassadorHook } from "@/hooks/useGetPeerAmbassadorHook";
import { useServicePartnerHook } from "@/hooks/useServicePartners";
import { AuthContext } from "../auth/authecontext";

export function Home() {
  const { auth, role } = useContext(AuthContext);
  console.log(role, "role");

  const users = useGetUsersHook();
  const concierge = useGetConciergeHook();
  const operators = useGetOperatorHook();
  const peers = useGetPeerAmbassadorHook();
  const partnersCount = useServicePartnerHook();

  useEffect(() => {
    if (role === "superAdmin") {
      users.handleGetUsers();
      concierge.handleGetConcierge();
      operators.handleGetOperator();
      peers.handleGetPeerAmbassador();
      partnersCount.handleGetServicePartner();
    } else if (role === "operator") {
      operators.handleGetOperator();
    }
  }, [role]);

  const filteredCardsData = statisticsCardsData.filter(card =>
    card.roles ? card.roles.includes(role) : true
  );
  const filteredChartsData = statisticsChartsData.filter(chart =>
    chart.roles ? chart.roles.includes(role) : true
  );

  let countsArray = [];
  let titlesArray = [];

  if (role === "superAdmin") {
    countsArray = [
      users?.usersCount,
      concierge?.conciergeCount,
      operators?.operatorCount,
      peers?.peerCount,
      partnersCount.partnersCount,
    ];
    titlesArray = [
      "Total Users",
      "Total Concierges",
      "Total Operators",
      "Total Peers",
      "Total Partners",
    ];
  } else if (role === "operator") {
    const employedCount = operators?.getOperators?.filter(item => item.currentlyEmployed === true).length;
    countsArray = [
      operators?.operatorCount,
      employedCount
    ];
    titlesArray = [
      "Total Operators",
      "Employed"
    ];
  }
console.log()
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredCardsData.map(({ icon, title, footer, ...rest }, index) => (
          <StatisticsCard
            key={title}
            {...rest}
            value={countsArray[index]}
            title={titlesArray[index]} // Use titlesArray based on the role
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon
                  strokeWidth={2}
                  className="h-4 w-4 text-blue-gray-400"
                />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
