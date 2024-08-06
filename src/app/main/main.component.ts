import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgClass, NgFor } from '@angular/common';
import { url } from 'node:inspector';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit{
  currentIndex: number = 0;
  isPlaying:boolean = false;
  audio!: HTMLAudioElement;
  song: any[] = [

    {
        name: 'Kajra Mohabbat Wala',
        artist: 'Shamshad Begum, Asha Bhosle',
        image: 'assets/songs/song-images/kajra-muhabat-wala.jpeg',
        url: '../../assets/songs/soundTrack/song-1.mp3'
    },

    {
        name: '0-Bedardya',
        artist: 'Arjit Singh',
        image: 'assets/songs/song-images/bedardya.jpg',
        url: '../../assets/songs/soundTrack/song-2.mp3'
    },

    {
        name:   'Dil smbhal jaa zara',
        artist: 'Arjit Singh, Mohammad Irfan',
        image: 'assets/songs/song-images/dil-smbhal-ja-zra.jpeg',
        url: '../../assets/songs/soundTrack/song-4.mp3'
    },

    {
      name:  'Kesariya',
      artist: 'Shreya Goshal',
      image: 'assets/songs/song-images/Kesariya-Audio-Teaser-From-Brahmastra--Hindi-2022-20220414173718-500x500.jpg',
      url: '../../assets/songs/soundTrack/song-3.mp3'
    },

    {
        name:  'Kal Ho na Ho',
        artist: 'Shreya Goshal',
        image: 'assets/songs/song-images/Kal_Ho_Naa_Ho.jpg',
        url: '../../assets/songs/soundTrack/song-5.mp3'
    },

    {
      name:  'Kabira',
      artist: '	Tochi Raina, Rekha Bhardwaj',
      image: 'assets/songs/song-images/kabira.jpg',
      url: '../../assets/songs/soundTrack/song-6.mp3'
  }
]

  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    console.log(this.song);
  }

  ngOnInit(): void{
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio(); // Initialize audio element only in browser
      if (this.song.length > 0) {
        this.audio.src = this.song[this.currentIndex].url;
      }
    }
  }

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  prevSong(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.playSong();
    }
  }

  nextSong(): void {
    if (this.currentIndex < this.song.length - 1) {
      this.currentIndex++;
      this.playSong();
    }
  }

  playSong(): void { // added playSong method
    if (this.song.length > 0) {
      this.audio.pause();
  
      this.audio.src = this.song[this.currentIndex].url; // Assuming 'sound' is the property holding the URL
  
      this.audio.load();

      this.audio.play();

      this.isPlaying = true;
    }
}

changeVolume(event: any):void{
  const volume = event.target.value / 100; // Normalize volume to be between 0 and 1
  this.audio.volume = volume;
}
}