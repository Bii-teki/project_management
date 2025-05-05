"use client";
import { FiFolder, FiActivity, FiDollarSign } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const projectsData = [
  { month: 'Jan', projects: 5 },
  { month: 'Feb', projects: 8 },
  { month: 'Mar', projects: 12 },
  { month: 'Apr', projects: 15 },
  { month: 'May', projects: 18 },
  { month: 'Jun', projects: 22 },
  { month: 'Jul', projects: 24 },
];

const budgetData = [
  { month: 'Jan', budget: 200000 },
  { month: 'Feb', budget: 350000 },
  { month: 'Mar', budget: 500000 },
  { month: 'Apr', budget: 750000 },
  { month: 'May', budget: 900000 },
  { month: 'Jun', budget: 1100000 },
  { month: 'Jul', budget: 1245000 },
];

function Analytics() {
  return (
    <div className="w-full space-y-6">
      {/* Top Metrics Cards - Now properly stretched */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        {/* Total Projects Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex-1 min-w-0">
          <div className="flex items-center gap-3 h-full">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg flex-shrink-0">
              <FiFolder className="text-blue-600 dark:text-blue-400 text-lg" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Projects</h3>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1 truncate">24</p>
            </div>
          </div>
        </div>

        {/* Total Budget Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex-1 min-w-0">
          <div className="flex items-center gap-3 h-full">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg flex-shrink-0">
              <FiDollarSign className="text-green-600 dark:text-green-400 text-lg" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Budget</h3>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1 truncate">$1,245,000</p>
            </div>
          </div>
        </div>

        {/* Active Projects Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex-1 min-w-0">
          <div className="flex items-center gap-3 h-full">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg flex-shrink-0">
              <FiActivity className="text-purple-600 dark:text-purple-400 text-lg" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Projects</h3>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1 truncate">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section - Using 12-column grid for precise control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Chart - Takes 8 columns on large screens */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Projects Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} className="dark:stroke-gray-700" />
                <XAxis 
                  dataKey="month"
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  className="dark:fill-gray-400 dark:axisLine-gray-700"
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  className="dark:fill-gray-400 dark:axisLine-gray-700"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderColor: '#e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                    color: '#111827'
                  }}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Line
                  type="monotone"
                  dataKey="projects"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Chart - Takes 4 columns on large screens */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} className="dark:stroke-gray-700" />
                <XAxis 
                  dataKey="month"
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  className="dark:fill-gray-400 dark:axisLine-gray-700"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderColor: '#e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                    color: '#111827'
                  }}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Budget']}
                />
                <Line
                  type="monotone"
                  dataKey="budget"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;