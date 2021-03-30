import { NextPageContext } from "next";
import { decode } from "jsonwebtoken";
import Router from "next/router";
import { parseCookies } from "nookies";

//essayer avec verify au lieu de decode

export async function myGetEtu(url: string, ctx: NextPageContext) {
  const cookie = parseCookies(ctx);

  const decoded = decode(cookie.auth, { complete: true });

  const resp = await fetch(url);

  if (decoded === null || (decoded.payload.isEtu === false && ctx.req)) {
    ctx.res?.writeHead(302, {
      Location: `${process.env.adress}modifierProfil/prof`,
    });
    ctx.res?.end();
    return;
  }

  if (decoded.payload.isEtu === false && !ctx.req) {
    Router.replace("/modifierProfil/prof");
    return {};
  }

  const json = await resp.json();

  return json;
}
