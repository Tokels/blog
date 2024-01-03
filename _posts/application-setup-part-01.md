---
title: "Application setup - Using GitHub workflow."
excerpt: "Let's setup a project from scratch and define some workflows."
coverImage: "/assets/blog/application-setup/part-01-cover.jpg"
date: "2024-01-02T10:45:39.322Z"
author:
  name: Julia Stjerna
  picture: "/assets/blog/authors/julia.jpeg"
ogImage:
  url: "/assets/blog/application-setup/part-01-cover.jpg"
---

## Application from scratch - Setup Part 1.

Let's setup an application from scratch. Here we'll create our remote workflow and ensure that it falls under industry standards. We will use GitHub as our version control and by using GitHub Projects we will make sure that we follow a scrum/kanban workflow.

## Step 1.

### Create organization on GitHub

#### Intro

GitHub organizations provide a structured and collaborative space for individuals and teams to manage, contribute to, and organize their projects. This is not merely a matter of aesthetics; it's a strategic move that can significantly enhance your workflow, scalability, and overall efficiency... [Read more](https://juliastjerna.vercel.app/posts/github-organization)

#### How To

[Create Organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/creating-a-new-organization-from-scratch)

## Step 2.

### Create project on GitHub

#### Intro

Projects are an adaptable collection of items that stay up-to-date with GitHub data. Your projects can track issues, pull requests, and ideas that you note down. You can add custom fields and create views for specific purposes.

#### How To

[Create Project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project)

## Step 3.

### Create repository on GitHub

#### Intro

In the world of version control and collaborative software development, a repository is a central hub where all the elements of a project come together. It serves as a digital container, housing the source code, documentation, images, and any other files that constitute a project... [Read more](https://juliastjerna.vercel.app/posts/repository)

#### How To

[Create Repository](https://docs.github.com/en/github-ae@latest/repositories/creating-and-managing-repositories/creating-a-new-repository)

## Step 4.

### Create project board on GitHub

#### Intro

In essence, leveraging GitHub Project Boards isn't just about creating a to-do list; it's about embracing a dynamic tool that empowers your team to visualize, collaborate, and optimize their workflow. Whether you're steering a small startup project or navigating the complexities of a large-scale development effort, GitHub Project Boards emerge as a strategic asset, unlocking the full potential of your team and your projects... [Read more](https://juliastjerna.vercel.app/posts/github-project-board)

#### How To

[Create Project Board](https://docs.github.com/en/github-ae@latest/issues/organizing-your-work-with-project-boards/managing-project-boards/creating-a-project-board)

## Step 5.

### Organising your project board

Different scrum masters and project variations are some concepts that changes the way we organise our projects. We will organize our board with the standard columns of: "Todo | In Progress | Done" where each column belongs to a feature. E.g. if your app will have a feature where the user can change their information in their profile the columns for this will be "Todo - User Profile | Done - User Profile". To be even more organised we will label each item in the column with categories such as: "design, bug, test, docs, dependency install" and more. These items will be converted to issues so that you can branch out on the feature you're working on, giving a workflow where multiple developers can work on the same project at once.

[Example of Project Board](https://github.com/orgs/Tokels/projects/2/views/2)

## Step 6.

### Understanding item flow

1. Add item to "Todo - <placeholder for feature>"
2. Add description
3. Assign item to developer
4. Convert to issue - choose repository where issue belongs too
5. Add label/s
6. Create branch
7. Do what you need to do for the issue
8. Add, commit and push
9. Merge with main
10. Securely delete branch

## Continue to part 2a for setting up a React Native project:

[Click here](https://juliastjerna.vercel.app/posts/application-setup-part-02a-react-native)

#### More applications setups will come soon, e.g. for frontend and fullstack web application using React, Angular etc.
