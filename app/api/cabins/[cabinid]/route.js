import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
 
    const { cabinid } = params;

    try {
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinid),
            getBookedDatesByCabinId(cabinid)
        ]);
        return Response.json({ cabin, bookedDates });
        
    } catch (error) {
        return Response.json({ error: error.message });
    }
    return Response.json({message: "Hello from the route handler!"})
}