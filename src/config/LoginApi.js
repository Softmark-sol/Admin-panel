import API_CONFIG from "./api";

export async function adminLogin(username, password) {
    try {
        const res = await fetch(`http://localhost:4000/admin-auth`, {
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
