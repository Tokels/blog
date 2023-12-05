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

### I asked ChatGPT a question after giving me this example:

_Component testing is performed by the testing team and not by the developing team. This means that the testing team don't know the source code of the application. So my question is about your component test: why are you testing that the button calls the "onClick prop when clicked" when you as a test team shouldn't know that source code?_

## and here's how ChatGPT corrected themselves:

_You raise a valid point, and it's an important distinction between unit testing and component testing. In component testing, the testing team typically interacts with the application as a black box without knowledge of the internal source code. My apologies for the confusion in my previous example._

_In component testing, the emphasis is more on testing the external behavior of the component or module without delving into the specifics of its implementation. Let me correct the Cypress component test to align with this concept:_

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

I just wanted to write about this because I believe the human eye will always be needed in combination with AI to observe and question the outcome. I've gotten questions if I believe that AI will take our jobs and my reply has always been that AI will help us do a better job as long as we don't let it be our job.

Dare to question what the AI tries to teach you.
