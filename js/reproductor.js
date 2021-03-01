'use strict'

/* GUARDADO DE LAS CANCIONES */
const Musics = {
    "songs": [
        {
            "name": "Get Lucky",
            "artist": "Daft Punk",
            "dir-image": "images/daft-punk.jpg",
            "dir-song": "music/get-lucky.mp3"
        },
        {
            "name": "Instant Crush",
            "artist": "Daft Punk",
            "dir-image": "images/daft-punk.jpg",
            "dir-song": "music/instant-crush.mp3"
        },
        {
            "name": "One More Time",
            "artist": "Daft Punk",
            "dir-image": "images/daft-punk.jpg",
            "dir-song": "music/one-more-time.mp3"
        },
        {
            "name": "Around the World",
            "artist": "Daft Punk",
            "dir-image": "images/daft-punk.jpg",
            "dir-song": "music/around-the-world.mp3"
        },
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

//indice de la cancion actual
var CurrentSong = 0;

var audio;  //etiqueta <audio>
var image;  //etiqueta <img>
var song;   //etiqueta <span> para el nombre de la cancion
var artist; //etiqueta <span> para el nombre deL artista de la cancion

var next, back;

var musicUl;

window.onload = function(){
    console.log('se ha cargado el DOM!');
    //obtenemos los elementos de html para modificarlos en javascript
    audio = document.querySelector('#audio');
    image = document.querySelector('#song-image');
    song = document.querySelector('#song-name');
    artist = document.querySelector('#song-artist');

    musicUl = document.querySelector('#musics-box ul');

    AddMusicList();

    SetNewSong(CurrentSong);

    back = document.querySelector('#back');
    next = document.querySelector('#next');
    back.addEventListener('mouseup', BackSong, false);
    next.addEventListener('mouseup', NextSong, false);
    audio.addEventListener('ended', NextSongFromEnded, false);
    audio.addEventListener('play', function(){
        var borderPlaying = document.querySelector('#Border');
        borderPlaying.setAttribute('class', 'border-playing');
    }, false);
    audio.addEventListener('pause', function(){
        var borderPlaying = document.querySelector('#Border');
        borderPlaying.setAttribute('class', 'border');
    }, false);
}

function SetNewSong(index){
    if(audio.paused){
        audio.src = Musics.songs[index]["dir-song"];
    }else{
        audio.src = Musics.songs[index]["dir-song"];
        audio.play();
    }
    image.src = Musics.songs[index]["dir-image"];
    song.innerHTML = Musics.songs[index]["name"];
    artist.innerHTML = Musics.songs[index]["artist"];

    var id = '#'+Musics.songs[index].name+"-"+Musics.songs[index].artist;
    var border = document.querySelector(id.replace(/\s+/g, ''));

    var lis = musicUl.childNodes;

    for(let i = 0; i < lis.length; i++){
        var b = lis[i].firstChild;
        if(b.id == border.id){
            b.setAttribute('class', 'box-music-border-select');
        }else{
            b.setAttribute('class', 'box-music-border');
        }
    }

}

function BackSong(){
    CurrentSong = (CurrentSong==0)?Musics.songs.length-1:CurrentSong-1;
    SetNewSong(CurrentSong);
}
function NextSong(){
    CurrentSong = (CurrentSong==Musics.songs.length-1)?0:CurrentSong+1;
    SetNewSong(CurrentSong);
}
function NextSongFromEnded(){
    if(CurrentSong < 4){
        CurrentSong++;
        SetNewSong(CurrentSong);
        audio.play();
    }
}

function AddMusicList(){
    //creamos los elementos 'li' que muestran las canciones
    for(let i = 0; i < Musics.songs.length; i++){
        CreateLi(musicUl, Musics.songs[i], i);
        console.log(Musics.songs[i].name);
    }
}

//creamos un li para el ul de las canciones
function CreateLi(ul, song, i){
    var li = document.createElement('li');
    var border = document.createElement('div');
    var id = song.name+"-"+song.artist;
    console.log(id.replace(/\s+/g, ''));
    border.setAttribute('id', id.replace(/\s+/g, ''));
    border.setAttribute('class', 'box-music-border');
    border.addEventListener('click', function(){
        CurrentSong = i;
        SetNewSong(CurrentSong);
    });
    var box = document.createElement('div');
    box.setAttribute('class', 'box-music');
    var img = document.createElement('img');
    img.setAttribute('src', song["dir-image"]);
    img.setAttribute('width', '64')
    var divp = document.createElement('div');
    divp.setAttribute('class', 'box-music-text');
    var p = document.createElement('p');
    var spanName = document.createElement('span');
    var spanSpace = document.createElement('span');
    var spanArtist = document.createElement('span');

    spanArtist.innerHTML = song.artist;
    spanSpace.innerHTML = '-';
    spanName.innerHTML = song.name;
    p.append(spanName);
    p.append(spanSpace);
    p.append(spanArtist);

    divp.append(p);

    box.append(img);
    box.append(divp);

    border.append(box);

    li.append(border);

    ul.append(li);

}
