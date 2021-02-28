'use strict'

const Musics = {
    "songs": [
        {
            "name": "Blinding Lights",
            "artist": "The Weeknd",
            "dir-image": "images/the-weeknd.jpg",
            "dir-song": "music/blinding-lights.mp3"
        },
        {
            "name": "Save Your Tears",
            "artist": "The Weeknd",
            "dir-image": "images/the-weeknd.jpg",
            "dir-song": "music/save-your-tears.mp3"
        },
        {
            "name": "Get Lucky",
            "artist": "Daft Punk",
            "dir-image": "images/daft-punk.jpg",
            "dir-song": "music/get-lucky.mp3"
        },
        {
            "name": "Psycho",
            "artist": "Post Malone",
            "dir-image": "images/postmalone.jpg",
            "dir-song": "music/psycho.mp3"
        },
        {
            "name": "Imagination",
            "artist": "Foster The People",
            "dir-image": "images/imagination.jpg",
            "dir-song": "music/imagination.mp3"
        }
    ]
}

var CurrentSong = 0;

var audio;
var image;
var song;
var artist;

var next, back;

window.onload = function(){
    console.log('se ha cargado el DOM!');
    Musics.songs.forEach(element => {
        console.log(element);
    });
    audio = document.querySelector('#audio');
    audio.src = Musics.songs[CurrentSong]["dir-song"];
    image = document.querySelector('#song-image');
    image.src = Musics.songs[CurrentSong]["dir-image"];
    song = document.querySelector('#song-name');
    song.innerHTML = Musics.songs[CurrentSong]["name"];
    artist = document.querySelector('#song-artist');
    artist.innerHTML = Musics.songs[CurrentSong]["artist"];

    back = document.querySelector('#back');
    next = document.querySelector('#next');
    back.addEventListener('mouseup', BackSong, false);
    next.addEventListener('mouseup', NextSong, false);
    audio.addEventListener('ended', NextSongFromEnded, false);
}

function BackSong(){
    console.log(audio.paused);
    CurrentSong = (CurrentSong==0)?4:CurrentSong-1;
    if(audio.paused){
        audio.src = Musics.songs[CurrentSong]["dir-song"];
    }else{
        audio.src = Musics.songs[CurrentSong]["dir-song"];
        audio.play();
    }
    image.src = Musics.songs[CurrentSong]["dir-image"];
    song.innerHTML = Musics.songs[CurrentSong]["name"];
    artist.innerHTML = Musics.songs[CurrentSong]["artist"];
}
function NextSong(){
    console.log(audio.paused);
    CurrentSong = (CurrentSong==4)?0:CurrentSong+1;
    if(audio.paused){
        audio.src = Musics.songs[CurrentSong]["dir-song"];
    }else{
        audio.src = Musics.songs[CurrentSong]["dir-song"];
        audio.play();
    }
    image.src = Musics.songs[CurrentSong]["dir-image"];
    song.innerHTML = Musics.songs[CurrentSong]["name"];
    artist.innerHTML = Musics.songs[CurrentSong]["artist"];
}
function NextSongFromEnded(){

    if(CurrentSong < 4){
        CurrentSong++;
        audio.src = Musics.songs[CurrentSong]["dir-song"];
        audio.play();
        image.src = Musics.songs[CurrentSong]["dir-image"];
        song.innerHTML = Musics.songs[CurrentSong]["name"];
        artist.innerHTML = Musics.songs[CurrentSong]["artist"];
    }
}