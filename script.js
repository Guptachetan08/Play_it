console.log("welcome to play it")

let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3')
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

myProgressBar.value = 0;
let songs = [
    {songName: "Warriyo - Muritals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "3:50"},
    {songName: "Cielo - Huma Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "2:33"},
    {songName: "Deaf key", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "4:33"},
    {songName: "Bella ciao", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "4:27"},
    {songName: "Heaven & hide", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "3:28"},
    {songName: "Love me alone", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "3:28"},
    {songName: "janji heros", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "4:33"},
    {songName: "Leaches", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "3:50"},
    {songName: "left it too", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "3:28"},
    {songName: "Killing me inside", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "4:27"}
]

songItem.forEach((element,i) =>{
    //console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
})

//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        pauseSpecific();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity= 0;
    }
})

//listn to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekebar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        if(!audioElement.paused && e.target.id==songIndex){
            audioElement.pause();
            makeAllPlays();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity= 0;
        }
        else{
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
       
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex++;
    }
    makeAllPlays();
    pauseSpecific();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex--;
    }
    makeAllPlays();
    pauseSpecific();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
})

const pauseSpecific = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        if(element.id==songIndex && audioElement.played){
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    })
}