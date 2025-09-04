// Service for getting Reddit user information
export interface RedditUserResponse {
  username: string;
  status: string;
}

// Get current Reddit username from the server
export const getCurrentRedditUsername = async (): Promise<string> => {
  try {
    const response = await fetch('/api/current-user');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: RedditUserResponse = await response.json();
    
    if (data.status === 'success') {
      return data.username;
    } else {
      throw new Error('Failed to get username from server');
    }
  } catch (error) {
    console.error('Error fetching Reddit username:', error);
    // Fallback to anonymous if API fails
    return 'anonymous';
  }
};

// Check if username is a valid Reddit username (not anonymous or generated)
export const isValidRedditUsername = (username: string): boolean => {
  return username !== 'anonymous' && !username.includes('Player') && !username.includes('Gamer');
};
