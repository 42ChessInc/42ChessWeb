import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxSonnerToaster, toast } from "ngx-sonner";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, NgxSonnerToaster],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	protected readonly title = signal("42ChessWeb");
	protected readonly toast = toast;
}
