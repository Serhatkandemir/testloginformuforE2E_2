describe("Login formu", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Başarılı form gönderimi", () => {
    it("geçerli bilgilerle success sayfasını açar", () => {
      cy.get('[data-cy="email-input"]')
        .type("test@example.com");

      cy.get('[data-cy="password-input"]')
        .type("Strong123!");

      cy.get('[data-cy="rules-checkbox"]')
        .check();

      cy.get('[data-cy="submit-button"]')
        .should("not.be.disabled")
        .click();

      cy.url().should("include", "/success");

      cy.get('[data-cy="success-page"]')
        .should("be.visible");

      cy.contains("Form başarıyla gönderildi.")
        .should("be.visible");
    });
  });

  describe("Hatalı form durumları", () => {
    it("email yanlışsa bir email hata mesajı gösterir", () => {
      cy.get('[data-cy="email-input"]')
        .type("yanlis-email")
        .blur();

      cy.get('[data-cy="email-error"]')
        .should("have.length", 1);

      cy.get('[data-cy="email-error"]')
        .should("be.visible")
        .and(
          "contain.text",
          "Geçerli bir email adresi giriniz."
        );

      cy.get('[data-cy="submit-button"]')
        .should("be.disabled");
    });

    it("email ve password yanlışsa iki hata mesajı gösterir", () => {
      cy.get('[data-cy="email-input"]')
        .type("yanlis-email")
        .blur();

      cy.get('[data-cy="password-input"]')
        .type("123")
        .blur();

      cy.get('[role="alert"]')
        .should("have.length", 2);

      cy.get('[data-cy="email-error"]')
        .should(
          "contain.text",
          "Geçerli bir email adresi giriniz."
        );

      cy.get('[data-cy="password-error"]')
        .should(
          "contain.text",
          "8 haneli güçlü bir şifre giriniz."
        );

      cy.get('[data-cy="submit-button"]')
        .should("be.disabled");
    });

    it("email ve password doğru fakat kurallar kabul edilmediyse buton disabled kalır", () => {
      cy.get('[data-cy="email-input"]')
        .type("test@example.com");

      cy.get('[data-cy="password-input"]')
        .type("Strong123!");

      cy.get('[data-cy="rules-checkbox"]')
        .should("not.be.checked");

      cy.get('[data-cy="submit-button"]')
        .should("be.disabled");

      cy.url().should("not.include", "/success");
    });
  });
});