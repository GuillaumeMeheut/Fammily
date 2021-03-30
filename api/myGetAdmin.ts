import { NextPageContext } from "next";
import { decode } from "jsonwebtoken";
import Router from "next/router";
import { parseCookies } from "nookies";

//essayer avec verify au lieu de decode

export async function myGetAdmin(url: string, ctx: NextPageContext) {
  const cookie = parseCookies(ctx);

  const decoded = decode(cookie.auth, { complete: true });

  const resp = await fetch(url);

  if (decoded === null || (decoded.payload.isAdmin === false && ctx.req)) {
    ctx.res?.writeHead(302, {
      Location: `${process.env.adress}login`,
    });
    ctx.res?.end();
    return;
  }

  if (decoded.payload.isAdmin === false && !ctx.req) {
    Router.replace("/login");
    return {};
  }

  const json = await resp.json();

  return json;
}
