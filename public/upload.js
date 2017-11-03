let formTitle = document.querySelector(".form-title"),
    formFile = document.querySelector(".form-file"),
    formDate = document.querySelector(".form-date"),
    summary = document.querySelector(".summary"),
    username = document.querySelector(".username-greeting");
let title, file, releaseDate;
const initDate = /\d{4}-\d{2}-\d{2}/.exec(new Date().toISOString())[0];

formTitle.addEventListener("input", () => {
    title = formTitle.value;
});
formFile.addEventListener("change", () => {
    file = formFile.files[0];
});
formDate.addEventListener("input", () => {
    releaseDate = formDate.value;
});

const updateSummary = setInterval(() => {
    formTitle.value = title || "";
    formFile.files[0] = file;
    formDate.value = releaseDate;
    summary.innerHTML = `This song${title?`'s title`:``} is <b>${title || `untitled`}</b>.
                        <br>The author of the song is <b>${username.innerHTML}</b>.
                        <br>It will be uploaded ${releaseDate || initDate}.`
});

function uploadSong() {
    let upload = new FormData();
    const reader = new FileReader();
    try {
        if (title === "" || title === "Song title" || !title) {
            throw new Error("A title must be entered.");
        } else if (title.length > 55) {
            throw new Error("Title is too long.");
        }
        upload.append("song-title", title);
        console.log("appended song title");

        if (!releaseDate) {
            throw new Error("Release date was not specified.");
        }
        upload.append("releaseDate", releaseDate);

        if (!file) {
            throw new Error("There must be a file.");
        } else if (file.type !== "audio/mp3") {
            throw new Error("Not an mp3.");
        }
        upload.append("file", file);
        fetch("/api/music/upload", {
            method: "POST",
            credentials: "include",
            body: upload
        });

        console.log("got dat file");
    } catch (err) {
        clearInterval(updateSummary);
        summary.innerHTML = "Upload failed! Here's why:<br>" + err;
    };
}

function reset() {
    title = undefined;
    releaseDate = undefined;
    file = undefined;
}