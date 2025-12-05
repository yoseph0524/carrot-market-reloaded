import { NextRequest } from "next/server";
import db from "lib/db";
import getSession from "lib/session";
import { notFound, redirect } from "next/navigation";
import { getGithubAccessToken, getGithubData } from "lib/github";
import logIn from "lib/login";
import { generateRanodmString } from "lib/genString";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const { error, access_token } = await getGithubAccessToken(code);
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const { id, avatar_url, login } = await getGithubData(access_token, "user");
  const emailData = await getGithubData(access_token, "user/emails");
  const { email } = emailData[0];
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    return await logIn(user.id);
  }
  const findUser = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      id: true,
    },
  });

  const randomStr = generateRanodmString();
  const newUser = await db.user.create({
    data: {
      username: findUser ? login + "_" + randomStr : login,
      github_id: id + "_",
      avatar: avatar_url,
      email,
    },
    select: {
      id: true,
    },
  });
  await logIn(newUser.id);
}
