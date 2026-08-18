import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';



@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Footer],
    templateUrl: './app.html',
    styleUrl: './app.css'
})



export class App implements OnInit {
    protected readonly title = signal('ilias-precession-module');

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
    }
}
