// Sample data
const dummyPeople = [
  { id: 1, name: "John Doe", role: "manager" },
  { id: 2, name: "Jane Smith", role: "manager" },
  { id: 3, name: "Mike Johnson", role: "fundi" },
  { id: 4, name: "Sarah Williams", role: "fundi" },
  { id: 5, name: "David Brown", role: "worker" },
  { id: 6, name: "Emily Davis", role: "worker" },
];

const dummyProjects = {
  active: [
    {
      id: 1,
      title: "Office Building Construction",
      description: "5-story commercial building",
      startDate: "2023-06-01",
      endDate: "2024-05-30",
      status: "active",
      manager: "John Doe",
      fundi: "Mike Johnson",
      assignedPeople: [1, 3, 5]
    }
  ],
  archived: []
};