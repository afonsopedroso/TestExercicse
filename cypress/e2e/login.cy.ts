describe("Login Functionality", () => {
	it("should log in and redirect to /welcome on successful login", () => {
		window.sessionStorage.clear();
		cy.visit("/login");

		cy.contains("span", "Username")
			.parent()
			.find("input")
			.type("eve.holt@reqres.in");

		cy.contains("span", "Password").parent().find("input").type("cityslicka");

		cy.get("form").submit();

		cy.url().should("include", "/welcome");

		cy.contains("Welcome").should("be.visible");
	});
});
