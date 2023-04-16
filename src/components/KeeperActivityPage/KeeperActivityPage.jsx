import styles from "./KeeperActivityPage.css";
import ActivitySection from "./ActivitySection/ActivitySection";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
function KeeperActivityPage() {
  const dispatch = useDispatch();
  const userJobs = useSelector((store) => store.job.user_jobs);

  useEffect(() => {
    dispatch({ type: "FETCH_USER_JOBS" });
  }, []);

  return (
    <div className="keeper-activity-page-body">
      <div className="keeper-activity-active"></div>
      <ActivitySection
        jobs={userJobs.filter((job) => job.status !== "incomplete")}
        title={"previous jobs"}
      />
      <ActivitySection
        jobs={userJobs.filter((job) => job.status === "incomplete")}
        title={"Applied Jobs"}
      />
    </div>
  );
}

export default KeeperActivityPage;