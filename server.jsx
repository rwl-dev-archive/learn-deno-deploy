/** @jsx h */
/** @jsxFrag Fragment */

import {h, Fragment, renderJSX} from "https://deno.land/x/ssr_jsx@v0.1.5/mod.js";

const App = (
  <>
    <p>Hello, World!!</p>
  </>
)

const PORT = 8080
const server = Deno.listen({ port: 8080 })
console.log(`launched http://localhost:${PORT}`);

const handleConn = async (conn) => {
  const httpConn = Deno.serveHttp(conn)

  for await (const e of httpConn) {
    const response = new Response(await renderJSX(App), { headers: {'content-type': 'text/html; charset=utf-8'}})
    e.respondWith(response)
  }
}

for await (const conn of server) {
  handleConn(conn)
}
