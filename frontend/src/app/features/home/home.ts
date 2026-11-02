import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SEGMENTS } from '../../shared/nav-bar/segments';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './home.html',
	styleUrl: './home.css',
})

export class Home {
	readonly segments = SEGMENTS;
}