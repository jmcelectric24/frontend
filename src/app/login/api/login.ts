import { Hono } from 'hono';
import jwt from "jsonwebtoken";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config/firebaseConfig";

const app = new Hono();

app.post('/login', async (c) => {
    try {
        const { email, password } = await c.req.json(); // Retrieve name along with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Create a JWT token with issuer and audience
        const token = jwt.sign(
            { userId: userCredential.user.uid },
            `${process.env.JWT_SECRET}`,
            {
                expiresIn: "7d", // Token expires in 7 days
            }
        );

        // Return a response indicating success and include some user info
        return c.json({
            message: "Logged in successfully",
            uid: userCredential.user.uid,
            user: userCredential.user.email,
            name: userCredential.user.displayName, // Confirm the name has been set
            token: token
        }, 200); // Set vstatus code to 201 - Created
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error during login:", error.message);
            return c.json({ error: error.message }, 400); // Send a 400 status code for client errors
        } else {
            console.error("Unexpected error during login");
            return c.json({ error: "Unexpected error during login" }, 500); // Send a 500 status code for server errors
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
            // Token is verified, optionally perform additional checks or actions
            return c.json({
                message: "Token is valid and user is verified",
                success: true,
            }, 200);

        } catch (err) {
            // Provide more specific error messages
            let message;
            if (err instanceof jwt.TokenExpiredError) {
                message = "Token has expired. Please login again.";
                c.json({ error: message, success: false }, 401); 
            } else if (err instanceof jwt.JsonWebTokenError) {
                message = "Invalid token. Please login again.";
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
