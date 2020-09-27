export default function getHTML(options){
            
    let {url, success, error} = options;

    const xhr = new XMLHttpRequest;

    xhr.addEventListener("readystatechange", e => {
        if(xhr.readyState !== 4) return;

        if(xhr.status >= 200 && xhr.status < 300) {
            let html = xhr.responseText;
            success(html); 
        } else {
            let message = xhr.statusText || "Ocurrió un error";
            error(`Error ${xhr.status}: ${message}`);
        }
    });

    xhr.open("GET", url);
    xhr.setRequestHeader("Content-type","text/html; charset=utf-8;");
    xhr.send()
}