import API_CONFIG from "./api";

export async function adminLogin(username, password) {
    try {
        const res = await fetch(`https://8786-2400-adc1-1c7-5400-28a4-c4ec-da94-d97f.ngrok-free.app/admin-auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (!res.ok) {
            throw new Error('Network response was not ok.');
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('adminLogin Error:', error.message);
        throw error;
    }
}
