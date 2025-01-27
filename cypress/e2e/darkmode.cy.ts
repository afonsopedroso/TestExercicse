describe("Dark Mode Toggle and Authenticated Welcome Page", () => {
	beforeEach(() => {
		cy.visit("/", { failOnStatusCode: false });

		cy.window().then((win) => {
			win.sessionStorage.setItem("isAuth", "true");
			win.localStorage.setItem("theme", "light");
		});
	});

	it("should toggle dark mode and display the page correctly", () => {
		cy.visit("/welcome", { failOnStatusCode: false });

		cy.get("body").should("not.have.class", "dark");

		cy.get("button").contains("Toggle to Dark Mode").click();

		cy.get(".grid-cols-3").within(() => {
			cy.get("div.pb-3").should("exist");
		});
	});
});
