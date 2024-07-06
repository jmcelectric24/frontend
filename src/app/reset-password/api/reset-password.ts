import { Hono } from 'hono';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config/firebaseConfig";

const app = new Hono();

app.post('/reset-password', async (c) => {


  const { email } = await c.req.json();
  try{
    await sendPasswordResetEmail(auth, email);
    return c.json({
      message: "Reset mail sent successfully",
  }, 200);

  }
  catch (error) {
    if (error instanceof Error) {
        console.error("Error during password reset:", error.message);
        return c.json({ error: error.message }, 400); // Send a 400 status code for client errors
    } else {
        console.error("Unexpected error during password reset");
        return c.json({ error: "Unexpected error during lopassword resetgin" }, 500); // Send a 500 status code for server errors
    }
}
});

export default app;
