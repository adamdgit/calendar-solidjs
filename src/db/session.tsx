import { PrismaClient } from "@prisma/client";
import { redirect } from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
import { db } from ".";
import { hash, genSalt, compare } from "bcryptjs";

type LoginForm = {
  username: string;
  password: string;
};

type loginData = {
  id: string,
  username: string,
  password: string,
} | null

export async function register({ username, password }: LoginForm) {
  // hasing password with argon
  const salt = await genSalt(10);
  const hashpw = await hash(password, salt);
  return db.user.create({
    data: { username: username, password: hashpw },
  });
}

export async function login({ username, password }: LoginForm) {
  const user:loginData = await db.user.findUnique({ where: { username } });
  if (!user) return null;
  if (await compare(password, user.password)) return user
  else return null
}

// const sessionSecret = import.meta.env.SESSION_SECRET;

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: ["hello"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(db: PrismaClient, request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
