generate.onclick = function f() {
    cube.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    const memes = ["Yay", "Wow", "Awesome", "Cool", "Neat", "Great", "Splendid", "Very good"];
    
    meme.innerText = `${memes[Math.floor(Math.random() * (memes.length))]}`;

    return;
};

w_in.oninput = function width() {
    const w = parseInt(w_in.value);
    if (isNaN(w) || w < 0) {
        meme.innerText = "Both must be positive integers :(";
        return;
    }
    cube.style.width = `${w}px`;
    meme.innerText = "";
};

h_in.oninput = function height() {
    const h = parseInt(h_in.value);
    if (isNaN(h) || h < 0) {
        meme.innerText = "Both must be positive integers :(";
        return;
    }
    cube.style.height = `${h}px`;
    meme.innerText = "";
};