describe("Welcome Page", () => {
	beforeEach(() => {
		cy.visit("/", { failOnStatusCode: false });

		cy.window().then((win) => {
			win.sessionStorage.setItem("isAuth", "true");
		});

		cy.intercept("GET", "https://reqres.in/api/users?page=1", {
			statusCode: 200,
			body: {
				data: [
					{
						id: 1,
						first_name: "John",
						last_name: "Doe",
						avatar: "",
						email: "john@example.com",
					},
					{
						id: 2,
						first_name: "Jane",
						last_name: "Smith",
						avatar: "",
						email: "jane@example.com",
					},
				],
			},
		}).as("getUsers");
	});

	it("should display the list of users if sessionStorage token is true", () => {
		cy.visit("/welcome", { failOnStatusCode: false });

		cy.wait("@getUsers");

		cy.get(".grid-cols-3").within(() => {
			cy.get("div.pb-3").should("have.length", 2);
		});
	});
});
