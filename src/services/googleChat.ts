export interface ChatSpace {
  name: string; // e.g. "spaces/AAAAAAAAAAA"
  type: 'ROOM' | 'DM' | 'GROUP_CHAT' | 'SPACE_TYPE_UNSPECIFIED';
  displayName?: string;
  spaceType?: 'SPACE' | 'GROUP_CHAT' | 'DIRECT_MESSAGE';
  spaceThreadingState?: string;
  spaceDetails?: {
    description?: string;
    guidelines?: string;
  };
  singleUserBotDm?: boolean;
}

export interface ChatMessage {
  name: string;
  sender?: {
    name?: string;
    displayName?: string;
    avatarUrl?: string;
    type?: string;
  };
  text: string;
  createTime?: string;
}

const CHAT_BASE_URL = 'https://chat.googleapis.com/v1';

export async function listChatSpaces(accessToken: string): Promise<ChatSpace[]> {
  const response = await fetch(`${CHAT_BASE_URL}/spaces`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch spaces (${response.status})`);
  }

  const data = await response.json();
  return data.spaces || [];
}

export async function createChatSpace(
  accessToken: string,
  displayName: string,
  description?: string
): Promise<ChatSpace> {
  const response = await fetch(`${CHAT_BASE_URL}/spaces`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      spaceType: 'SPACE',
      displayName,
      spaceDetails: description ? { description } : undefined,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create space (${response.status})`);
  }

  return await response.json();
}

export async function listChatMessages(accessToken: string, spaceName: string): Promise<ChatMessage[]> {
  const response = await fetch(`${CHAT_BASE_URL}/${spaceName}/messages?pageSize=25`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch messages (${response.status})`);
  }

  const data = await response.json();
  return data.messages || [];
}

export async function sendChatMessage(
  accessToken: string,
  spaceName: string,
  text: string
): Promise<ChatMessage> {
  const response = await fetch(`${CHAT_BASE_URL}/${spaceName}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to send message (${response.status})`);
  }

  return await response.json();
}
