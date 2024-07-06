import { Hono } from 'hono';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/firebase/config/firebaseConfig';
const app = new Hono();

app.get('/get-bill', async (c) => {
    try {
        const { ivrs, month } = c.req.query();
        const billsCollection = ivrs.startsWith('H') ? 'ht_bills' : 'bills';
        const ivrs_key = ivrs.startsWith('H') ? 'accountId' : 'ivrs';
         

        const billsRef = collection(db, billsCollection);
        const filteredQuery = query(
            billsRef,
            where(ivrs_key, '==', ivrs),
            where('billFetchMonth', '==', month)
        );
        const querySnapshot = await getDocs(filteredQuery);

        if (querySnapshot.empty) {
            return c.json({ message: "No bill found for the given IVRS and month" }, 404); // Bill not found
        }

        // Correct JSON parsing
        const data = querySnapshot.docs.map(doc => doc.data()); // Get data from all matching documents

        return c.json({
            message: "Bill Fetched",
            data: data[0] // Include all matching bills
        }, 200); 
    } catch (error) {
        console.error("Error during bill fetch:", error); // Log the complete error object for debugging
        return c.json({ error: "Internal server error" }, 500); 
    }
});



export default app;
