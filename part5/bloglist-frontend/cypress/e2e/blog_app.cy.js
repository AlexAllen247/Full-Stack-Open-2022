describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user = {
            name: "test",
            username: "username",
            password: "password"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function () {
        cy.contains("username")
        cy.contains("password")
        cy.contains("login")
    })

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.get("#username").type("username")
            cy.get("#password").type("password")
            cy.get("#login-button").click()
            cy.contains("test logged in")
        })

        it("fails with wrong credentials", function () {
            cy.get("#username").type("wrong username")
            cy.get("#password").type("wrong password")
            cy.get("#login-button").click()
        })
    })

    describe("When logged in", function () {
        beforeEach(function () {
            cy.login({ username: "username", password: "password" })
        })

        it("a blog can be created", function () {
            cy.createBlog({
                title: "Cypress test blog",
                author: "Cypress",
                url: "www.test.com",
            })

            cy.contains("Cypress test blog")
        })

        describe("and several blogs exist", function () {
            beforeEach(function () {
                cy.createBlog({
                    title: "blog one",
                    author: "test",
                    url: "www.test.com",
                });
                cy.createBlog({
                    title: "blog two",
                    author: "test",
                    url: "www.test.com",
                });
                cy.createBlog({
                    title: "blog three",
                    author: "test",
                    url: "www.test.com",
                })
            })

            it("one of those can be liked", function () {
                cy.contains("blog two").parent().find("button").click()
                cy.get("#like-button").click()
            })

            it("one of those can be deleted", function () {
                cy.contains("blog three").parent().find("button").click()
                cy.get("#delete-button").click()
                cy.get("html").should("not.contain", "blog three")
            })

            it("they are ordered by the number of likes in descending order", async function () {
                cy.contains("blog two").parent().find("button").click()
                cy.get("#like-button").click().wait(500).click().wait(500)
                cy.contains("blog two").parent().find("button").click()

                cy.contains("blog three").parent().find("button").click()
                cy.get("#like-button").click().wait(500).click().wait(500).click().wait(500)

                cy.get(".blog").eq(0).should("contain", "blog three")
                cy.get(".blog").eq(1).should("contain", "blog two")
                cy.get(".blog").eq(2).should("contain", "blog one")
            })
        })
    })
})