import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import loginRoute from "@/app/login/api/login";
import resetRoute from "@/app/reset-password/api/reset-password";
import signupRoute from "@/app/sign-up/api/sign-up";
import billFetchRoute from '@/app/lt-data/[...slug]/api/bill'


// export const runtime = 'edge';

const app = new Hono().basePath('/api')

// Handling GET request
app.get('/', (c) => {
  return c.json({
    message: 'Testing... api',
  })
})

app.route("/v1/bills", billFetchRoute)


app.route("/v1/auth",loginRoute);
app.route("/v1/auth",resetRoute);
app.route("/v1/auth",signupRoute);




















































// Export handlers for HTTP methods
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);