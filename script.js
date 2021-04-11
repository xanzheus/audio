const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// song titles
const songs = ['Bhajan 1', 'Bhajan 2', 'Bhajan 3', 'Bhajan 4', 'Bhajan 5', 'Bhajan 6', 'Bhajan 7', 'Bhajan 8', 'Bhajan 9', 'Bhajan 10']

//keep track of songs
var songIndex = 2

//Initially load song info DOM

loadSong( songs[songIndex] )

//update song details
function loadSong( song ) {
    title.innerText = song
    audio.src = `bhajan/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause();
}

function prevSong() {
    songIndex--
    if( songIndex < 0 ) {
        songIndex = songs.length -1
    }

    loadSong( songs[songIndex] )

    playSong()

}

function nextSong() {
    songIndex++
    if( songIndex > songs.length -1 ) {
        songIndex = 0
    }
    loadSong( songs[songIndex] )

    playSong()
}

function updateProgress( e ) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = ( currentTime / duration ) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = ( clickX / width ) * duration
}

//Event listners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)