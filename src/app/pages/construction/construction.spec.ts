import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConstructionPage } from "./construction";

describe("ConstructionPage", () => {
	let component: ConstructionPage;
	let fixture: ComponentFixture<ConstructionPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ConstructionPage],
		}).compileComponents();

		fixture = TestBed.createComponent(ConstructionPage);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
