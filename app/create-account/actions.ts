"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "lib/constants";
import db from "lib/db";
import bycrypt from "bcrypt";
import { check, z } from "zod";
import { redirect } from "next/navigation";
import getSession from "lib/session";
import logIn from "lib/login";

const checkUsername = (username: string) => !username.includes("potato");

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Where is my username???"
            : "Not a string",
      })
      .toLowerCase()
      .trim()
      // .transform((username) => `🔥 ${username} 🔥`)
      .refine(checkUsername, "No potatoes allowed!"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async (data, ctx) => {
    const usernameExists = await db.user.findUnique({
      where: {
        username: data.username,
      },
      select: {
        id: true,
      },
    });
    if (usernameExists) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return;
    }
    const emailExists = await db.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
      },
    });
    if (emailExists) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
      });
      return;
    }
    if (!checkPasswords(data)) {
      ctx.addIssue({
        code: "custom",
        message: "Both passwords should be the same!",
        path: ["confirm_password"],
      });
      return;
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bycrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: { id: true },
    });
    console.log(user);

    await logIn(user.id);
  }
}
