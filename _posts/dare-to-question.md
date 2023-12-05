---
title: "Dare to question - AI is not the single source of truth"
excerpt: "Today I asked ChatGPT about differences between unit testing, component testing and e2e testing. ChatGPT gave me examples of all test suites, however the first attempt of the component test was lacking some very important concept."
coverImage: "/assets/blog/dare-to-question/cover.jpg"
date: "2023-12-05T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/dare-to-question/cover.jpg"
---

## Dare to question - AI is **not** the single source of truth

Today I asked ChatGPT about differences between unit testing, component testing and e2e testing.

ChatGPT gave me examples of all test suites, however the first attempt of the component test was lacking some very important concept. Consider following code snippet:

### 2. Component testing with Cypress - **before being questioned**

```js
// cypress/integration/button.spec.js
describe("Button Component", () => {
  it("renders button with label", () => {
    cy.visit("/");
    cy.get("[data-testid=button]").should("be.visible").contains("Click me");
  });

  it("calls onClick prop when clicked", () => {
    cy.visit("/");
    cy.get("[data-testid=button]").click();
  });
});
```

One of the biggest differences of a Unit test and a Component test is from who the tests are written and performed. Unit tests are written by the developing team, the ones who know the source code, while component tests are written by the testing team, the ones who don't know the source code.

I questioned ChatGPT about this, and here's how ChatGPT tried to correct themselves:

### 2. Component testing with Cypress - **after being questioned**

```js
// cypress/integration/button.spec.js
describe("Button Component", () => {
  it("renders button with label", () => {
    cy.visit("/");
    cy.get("[data-testid=button]").should("be.visible");
    // Cypress doesn't need to know about the onClick prop implementation.
  });

  it("interacts with the button", () => {
    cy.visit("/");
    cy.get("[data-testid=button]").click();
    // Perform assertions related to the external behavior without relying on the specific implementation details.
  });
});
```

## Conclusion

I just wanted to write about this because I believe the human eye will always be needed in AI to observe and question the outcome. I've gotten questions if I believe that AI will take our jobs and my reply has always been that AI will help to perform our jobs as long as we don't let it be our job.

Dare to question what the AI tries to teach you.
