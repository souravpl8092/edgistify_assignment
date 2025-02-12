import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export interface Task {
  _id: string;
  id: string;
  name: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export const fetchTasks = async (
  token: string,
  searchQuery: string = "",
  statusFilter: string = ""
) => {
  const response = await fetch(
    `${apiUrl}/api/task?search=${searchQuery}&status=${statusFilter}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Error fetching tasks");
  }
  return response.json();
};

export const createTask = async (task: any, token: string) => {
  const response = await axios.post(`${apiUrl}/api/task`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTask = async (task: any, token: string) => {
  const response = await axios.patch(`${apiUrl}/api/task/${task._id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTask = async (taskId: string, token: string) => {
  const response = await axios.delete(`${apiUrl}/api/task/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
