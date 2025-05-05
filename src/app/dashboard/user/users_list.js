import { FiUser, FiFolder, FiList, FiClock, FiUsers, FiDollarSign } from "react-icons/fi";

const Users = () => {
  // Enhanced sample data with salary information
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "manager",
      dailyRate: 1000,
      projects: [
        {
          id: 101,
          title: "Office Building Construction",
          tasks: [
            { id: 1001, name: "Site Preparation", status: "completed", dueDate: "2023-06-15", daysWorked: 5 },
            { id: 1002, name: "Foundation Work", status: "in-progress", dueDate: "2023-07-30", daysWorked: 8 }
          ]
        },
        {
          id: 102,
          title: "Residential Complex",
          tasks: [
            { id: 1003, name: "Structural Design", status: "pending", dueDate: "2023-08-10", daysWorked: 1 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Mike Johnson",
      role: "fundi",
      dailyRate: 500,
      projects: [
        {
          id: 101,
          title: "Office Building Construction",
          tasks: [
            { id: 1001, name: "Concrete Pouring", status: "completed", dueDate: "2023-06-20", daysWorked: 4 },
            { id: 1004, name: "Steel Framing", status: "in-progress", dueDate: "2023-07-25", daysWorked: 6 }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "fundi",
      dailyRate: 500,
      projects: [
        {
          id: 103,
          title: "Shopping Mall Renovation",
          tasks: [
            { id: 1005, name: "Demolition Work", status: "in-progress", dueDate: "2023-07-15", daysWorked: 7 },
            { id: 1006, name: "Electrical Wiring", status: "pending", dueDate: "2023-08-05", daysWorked: 0 }
          ]
        }
      ]
    }
  ];

  // Calculate total earnings for each member
  const membersWithEarnings = teamMembers.map(member => {
    const totalDays = member.projects.flatMap(p => 
      p.tasks.filter(t => t.status !== "pending").map(t => t.daysWorked)
      .reduce((sum, days) => sum + days, 0));
      
    const totalEarnings = totalDays * member.dailyRate;
    
    return {
      ...member,
      totalDays,
      totalEarnings
    };
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
      "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
    };
    
    const statusLabels = {
      completed: "Completed",
      "in-progress": "In Progress",
      pending: "Pending"
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${statusClasses[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', { 
      style: 'currency', 
      currency: 'KES' 
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6">
    {/* Payroll Summary Card */}
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FiDollarSign className="text-green-500 dark:text-green-400" />
            <span>Payroll Summary</span>
          </h3>
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
            Current Period
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Payroll */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Total Payroll</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                  {formatCurrency(membersWithEarnings.reduce((sum, member) => sum + member.totalEarnings, 0))}
                </p>
              </div>
              <div className="bg-white dark:bg-blue-900/40 p-2 rounded-full">
                <FiDollarSign className="text-blue-500 dark:text-blue-300" />
              </div>
            </div>
          </div>
  
          {/* Managers Payroll */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-1">Managers</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                  {formatCurrency(membersWithEarnings
                    .filter(m => m.role === "manager")
                    .reduce((sum, member) => sum + member.totalEarnings, 0))}
                </p>
              </div>
              <div className="bg-white dark:bg-purple-900/40 p-2 rounded-full">
                <FiUser className="text-purple-500 dark:text-purple-300" />
              </div>
            </div>
          </div>
  
          {/* Fundis Payroll */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 p-4 rounded-lg border border-green-100 dark:border-green-900/30 transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Fundis</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                  {formatCurrency(membersWithEarnings
                    .filter(m => m.role === "fundi")
                    .reduce((sum, member) => sum + member.totalEarnings, 0))}
                </p>
              </div>
              <div className="bg-white dark:bg-green-900/40 p-2 rounded-full">
                <FiUser className="text-green-500 dark:text-green-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* Team Assignment Table */}
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FiUsers className="text-blue-500 dark:text-blue-400" />
            <span>Team Assignments</span>
          </h3>
          <div className="flex items-center gap-2">
            <button className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Export
            </button>
            <button className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
              Filter
            </button>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Team Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role & Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Projects
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tasks
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Days Worked
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Earnings
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {membersWithEarnings.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shadow-inner">
                        <FiUser className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {person.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {person.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm ${
                        person.role === "manager" 
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200" 
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      }`}>
                        {person.role === "manager" ? "Manager" : "Fundi"}
                      </span>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <FiDollarSign className="mr-1 flex-shrink-0" />
                        <span>{formatCurrency(person.dailyRate)}/day</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      {person.projects.map((project) => (
                        <div key={project.id} className="flex items-center group">
                          <FiFolder className="flex-shrink-0 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors" />
                          <span className="text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-3">
                      {person.projects.flatMap(project => 
                        project.tasks.map(task => (
                          <div key={task.id} className="flex items-start group">
                            <FiList className="flex-shrink-0 mr-2 mt-0.5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {task.name}
                              </p>
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <FiClock className="mr-1 flex-shrink-0" />
                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                              {task.status !== "pending" && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  Days: {task.daysWorked}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-medium">
                      {person.totalDays}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(person.totalEarnings)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {person.totalDays} × {formatCurrency(person.dailyRate)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Users;