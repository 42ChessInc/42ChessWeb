import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UsernameInput } from "./username-input";

describe("UsernameInput", () => {
	let component: UsernameInput;
	let fixture: ComponentFixture<UsernameInput>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UsernameInput],
		}).compileComponents();

		fixture = TestBed.createComponent(UsernameInput);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
