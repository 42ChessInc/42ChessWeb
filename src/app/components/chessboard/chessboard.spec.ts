import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Chessboard } from "./chessboard";

describe("Chessboard", () => {
	let component: Chessboard;
	let fixture: ComponentFixture<Chessboard>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Chessboard],
		}).compileComponents();

		fixture = TestBed.createComponent(Chessboard);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
