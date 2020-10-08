export default async function getToken(token, $main) {
    try {
        let res = await fetch("https://opentdb.com/api_token.php?command=request");
        let json = await res.json();

        if (!res.ok) throw {status: res.status, statusText: res.statusText};

        token = json.token;

        localStorage.setItem('token', token);

    } catch(err) {
        let message = err.statusText || "Ocurrio un error";
        $main.innerHTML = `Error ${err.status} ${message}<br><a href="index.html" class="btn btn-primary col-12 mb-5 mt-1" type="submit">Back</a>`;
    }
}