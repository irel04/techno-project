import { useState } from "react";
import Sidebar from "../components/SideBar";
import OwnerOverview from "./OwnerOverview";
import OwnerManageListings from "./OwnerManageListings";
import OwnerSchedules from "./OwnerSchedules";
import OwnerSubscriptions from "./OwnerSubscriptions";

const OwnerPage = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <OwnerOverview />;
      case "Listings":
        return <OwnerManageListings />;
      case "Schedules":
        return <OwnerSchedules />;
      case "Subscriptions":
        return <OwnerSubscriptions />;
      default:
        return <OwnerOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-grow overflow-hidden">
        <div className="p-6 overflow-auto h-full">{renderContent()}</div>
      </div>
    </div>
  );
};

export default OwnerPage;
