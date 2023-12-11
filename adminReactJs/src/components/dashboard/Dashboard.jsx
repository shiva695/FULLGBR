import constants from "../../json/constants.json";
const Dashboard = () => {
  return (
    <div className="card-with-subheading">
      <div className="subheading">
        <div className="flex gap-x-5">
          <div
            className={
              location.pathname === constants.DASHBOARDNAVIGATE
                ? "font-semibold flex gap-1"
                : "flex gap-1"
            }
          >
            {constants.DASHBOARD}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
