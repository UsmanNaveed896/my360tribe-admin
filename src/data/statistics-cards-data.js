import { TableCellsIcon, UsersIcon } from "@heroicons/react/24/solid";
import { MdOutlineReduceCapacity, MdAttachMoney, MdSupervisedUserCircle } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Users",
    value: "2,300",
    footer: {
      color: "text-green-500",
      // value: "+3%",
      label: "Users",
    },
  },
  {
    color: "gray",
    icon: MdOutlineReduceCapacity,
    title: "Concierge",
    value: "$53k",
    footer: {
      color: "text-green-500",
      // value: "+55%",
      label: "Concierge",
    },
  },
  {
    color: "gray",
    icon: TableCellsIcon,
    title: "Operators",
    value: "$120k",
    footer: {
      color: "text-red-500",
      // value: "-10%",
      label: "Operators",
    },
  },
  {
    color: "gray",
    icon: MdSupervisedUserCircle,
    title: "Peer Ambassadors",
    value: "340",
    footer: {
      color: "text-blue-500",
      // value: "+20%",
      label: "Peer Ambassadors",
    },
  },
];
