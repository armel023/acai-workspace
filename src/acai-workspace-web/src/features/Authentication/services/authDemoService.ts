type DemoUser = {
  fullName: string;
  email: string;
  password: string;
};

type AuthResult = {
  success: boolean;
  message: string;
  userName?: string;
};

const seedUsers: DemoUser[] = [
  {
    fullName: "Arielle Dela Cruz",
    email: "arielle@acaiworkspace.com",
    password: "Acai@2026",
  },
  {
    fullName: "Marcus Reed",
    email: "marcus@acaiworkspace.com",
    password: "Acai@2026",
  },
];

const inMemoryUsers: DemoUser[] = [...seedUsers];

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

export async function loginWithDummyData(
  email: string,
  password: string,
): Promise<AuthResult> {
  await wait(750);

  const user = inMemoryUsers.find(
    (item) => item.email.toLowerCase() === email.toLowerCase(),
  );

  if (!user || user.password !== password) {
    return {
      success: false,
      message: "Invalid credentials. Try the demo account shown below.",
    };
  }

  return {
    success: true,
    message:
      "Signed in successfully. Backend connection is disabled in UI mode.",
    userName: user.fullName,
  };
}

export async function registerWithDummyData(
  fullName: string,
  email: string,
  password: string,
): Promise<AuthResult> {
  await wait(900);

  const exists = inMemoryUsers.some(
    (item) => item.email.toLowerCase() === email.toLowerCase(),
  );

  if (exists) {
    return {
      success: false,
      message: "A user with this email already exists in demo data.",
    };
  }

  inMemoryUsers.push({ fullName, email, password });

  return {
    success: true,
    message:
      "Registration successful. You can now sign in with your new account.",
    userName: fullName,
  };
}
