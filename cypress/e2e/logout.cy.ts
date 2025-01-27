describe("Logout Functionality", () => {
	it("should navigate to the /register page on logout", () => {
		cy.visit("/", { failOnStatusCode: false });

		cy.window().then((win) => {
			win.sessionStorage.setItem("isAuth", "true");
		});

		cy.visit("/welcome", { failOnStatusCode: false });

		cy.get("a").contains("Logout").click();

		cy.url().should("include", "/register");

		cy.contains("Register").should("be.visible");
	});
});
