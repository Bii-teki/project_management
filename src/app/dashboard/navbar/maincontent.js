import React from "react";
// import Overview from "./pages/Overview";
// import Calendar from "./pages/Calendar";
import User from "../../dashboard/user/user";
import Projects from "../../dashboard/projects/projects_list";
import MaterialsSAP from "../../dashboard/materials/materials_list";
import Analytics from "../overview/analytics";
import Tasks from "../../dashboard/tasks/task_list";
import Users from "../../dashboard/user/users_list";
import UserRegistration from "../../dashboard/user/register_user";
// import Budget from "./pages/Budget";
// import Settings from "./pages/Settings";

export default function MainContent({ activePage }) {
  return (
    <main className="flex-1 p-8">
      {/* {activePage === "overview" && <Analytics />}
      {activePage === "calendar" && <Calendar />}
      {activePage === "user" && <User />} */}
      {activePage === "overview" && <Analytics />}
      {activePage === "register" && <UserRegistration />}
      {activePage === "user" && <User />}
      {activePage === "users" && <Users />}
      {activePage === "tasks" && <Tasks />}
      {activePage === "projects" && <Projects />}
      {activePage === "materials" && <MaterialsSAP />}
      {/* {activePage === "tasks" && <Tasks />}
      {activePage === "budget" && <Budget />}
      {activePage === "settings" && <Settings />} */}
    </main>
  );
}
