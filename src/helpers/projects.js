import { BASE_URL } from "../constants/urls";

export const createProject = async (data) => {
  const url = `${BASE_URL}projects/`;

  console.log("hello");

  const authToken = localStorage.getItem("BearerToken");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("hey");
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
};
