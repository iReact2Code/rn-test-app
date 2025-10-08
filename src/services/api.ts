// Mock API for user auth, profile, and address management
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export type Address = {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  country: string;
};

let mockUser: UserProfile | null = null;
let mockToken: string | null = null;
let mockAddresses: Address[] = [];

export async function loginApi(email: string, password: string) {
  await delay(400);
  mockUser = { id: 'u1', name: email.split('@')[0] || 'User', email };
  mockToken = 'mock-token';
  return { token: mockToken, profile: mockUser };
}

export async function registerApi(
  name: string,
  email: string,
  password: string,
) {
  await delay(600);
  mockUser = { id: 'u1', name, email };
  mockToken = 'mock-token';
  return { token: mockToken, profile: mockUser };
}

export async function logoutApi() {
  await delay(200);
  mockUser = null;
  mockToken = null;
  return true;
}

export async function fetchProfileApi() {
  await delay(300);
  if (!mockUser) {
    throw new Error('Not authenticated');
  }
  return mockUser;
}

export async function updateProfileApi(profile: Partial<UserProfile>) {
  await delay(300);
  if (!mockUser) {
    throw new Error('Not authenticated');
  }
  mockUser = { ...mockUser, ...profile };
  return mockUser;
}

export async function fetchAddressesApi() {
  await delay(200);
  return mockAddresses;
}

export async function addAddressApi(address: Address) {
  await delay(200);
  mockAddresses.push(address);
  return address;
}

export async function removeAddressApi(id: string) {
  await delay(200);
  mockAddresses = mockAddresses.filter((a) => a.id !== id);
  return true;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
