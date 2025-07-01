generate.onclick = function f() {
    const w = parseInt(width.value);
    const h = parseInt(height.value);

    if (isNaN(w) || isNaN(h) || w < 0 || h < 0) {
        meme.innerText = ":(";
        alert("Both values must be positive numbers");
        return;
    };
    cube.style.width = `${w}px`;
    cube.style.height = `${h}px`;

    cube.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    const memes = ["Yay", "Wow", "Awesome", "Cool", "Neat", "Great", "Splendid", "Very good"];
    
    meme.innerText = `${memes[Math.floor(Math.random() * (memes.length))]}`;

    return;
};