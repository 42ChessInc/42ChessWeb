import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Tournament } from "./tournament";

describe("Tournament", () => {
	let component: Tournament;
	let fixture: ComponentFixture<Tournament>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Tournament],
		}).compileComponents();

		fixture = TestBed.createComponent(Tournament);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
