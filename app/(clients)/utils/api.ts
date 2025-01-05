// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * Handle API response and error
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
}

/**
 * User Authentication
 */
export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<{ token: string }>(response);
}

export async function signupUser(data: { name: string;email:string; password: string }) {
  const response = await fetch(`/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(response)
  return handleResponse<{ message: string }>(response);
}

/**
 * Get User Profile
 */
export async function getUserProfile(token: string) {
  const response = await fetch(`/api/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse<{ id: string; name: string }>(response);
}

export const getFriends = async () => {
  const response = await fetch("/api/friends");
  if (!response.ok) {
    throw new Error("Failed to fetch friends");
  }
  return response.json();  // Assuming the response contains the list of friends
};

export const removeFriend = async (friendId: string) => {
  const response = await fetch(`/api/friends/${friendId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove friend");
  }
  return response.json();
};

export async function getFriendRequests(token: string) {
  const response = await fetch(`/api/friends/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse<{ id: string; name: string }[]>(response);
}

export async function sendFriendRequest(token: string, userId: string) {
  const response = await fetch(`/api/friends/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  return handleResponse<{ message: string }>(response);
}

export async function respondToFriendRequest(
  token: string,
  requestId: string,
  action: "accept" | "reject"
) {
  const response = await fetch(`/api/friends/requests/${requestId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action }),
  });
  return handleResponse<{ message: string }>(response);
}

/**
 * Friend Recommendations
 */
export async function getRecommendations(token: string) {
  const response = await fetch(`/api/friends/recommendations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse<{ id: string; name: string }[]>(response);
}

/**
 * Search Users
 */
export async function searchUsers(token: string, query: string) {
  const response = await fetch(`/api/user/search?username=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse<{ id: string; username: string }[]>(response);
}
