// logs the user out
async function logout(){
    await fetch(`/users/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    })
}