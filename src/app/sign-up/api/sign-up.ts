import { Hono } from 'hono';
import jwt from "jsonwebtoken";
import {JwtPayload} from "jsonwebtoken";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config/firebaseConfig";

const app = new Hono();

function extractToken(bearerString: string) {
    if (bearerString && bearerString.startsWith("Bearer ")) {
      return bearerString.substring(7); // Remove the first 7 characters ("Bearer ")
    } else {
      // Handle invalid format (optional)
      console.error("Invalid Bearer token format");
      return "";
    }
  }
  

app.post('/sign-up', async (c) => {
    try {
        const { email } = await c.req.json(); // Retrieve name along with email and password
        const authHeader = c.req.header('Authorization');
        if (authHeader){
            const token = extractToken(authHeader);
            const decoded = jwt.verify(
                token,
                `${process.env.JWT_SECRET}`,
            );
            const userId = (decoded as JwtPayload).userId; // Assert that 'decoded' is JwtPayload

            if (userId==="qpy0hFwoMEXi13XBtFOU5LJ2N6m1"){
                const password = "12345678";
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                // Return a response indicating success and include some user info
                return c.json({
                    message: "Signed up successfully",
                    uid: userCredential.user.uid,
                    user: userCredential.user.email,
                    name: userCredential.user.displayName, // Confirm the name has been set
                }, 200); // Set vstatus code to 201 - Created
            }
            else{
                return c.json({ message: "Permission denied" }, 403);
            }


        }
        else{
            return c.json({ message: "Permission denied" }, 403);
        }


    } catch (error) {
        if (error instanceof Error) {
            console.error("Error during signup:", error.message);
            return c.json({ error: error.message }, 400); // Send a 400 status code for client errors
        } else {
            console.error("Unexpected error during signup");
            return c.json({ error: "Unexpected error during signup" }, 500); // Send a 500 status code for server errors
        }
    }
});

app.post('/verify-token', async (c) => {
    try {
        const { accessToken } = await c.req.json();
        if (!accessToken) {
            return c.json({ error: "Access token is required", success: false }, 400);
        }

        // Verify the access token with issuer and audience checks
        try {
            const decoded = await jwt.verify(
                accessToken,
                `${process.env.JWT_SECRET}`,
            );

            // Token is verified, optionally perform additional checks or actions
            return c.json({
                message: "Token is valid and user is verified",
                success: true,
            }, 200);

        } catch (err) {
            // Provide more specific error messages
            let message;
            if (err instanceof jwt.TokenExpiredError) {
                message = "Token has expired. Please signup again.";
                c.json({ error: message, success: false }, 401); 
            } else if (err instanceof jwt.JsonWebTokenError) {
                message = "Invalid token. Please signup again.";
                c.json({ error: message, success: false }, 401); 
            } else {
                message = "Unexpected token error. Please contact support.";
                console.error(err); 
                c.json({ error: message, success: false }, 500); 
            }
        }
    } catch (error) {
        console.error("Error parsing request body: ", error); 
        return c.json({ error: "Invalid request format", success: false }, 400);
    }
});

export default app;
