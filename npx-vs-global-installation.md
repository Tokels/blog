# Comparing `npx` and Global Package Installations in npm

Node Package Manager (npm) offers developers versatile ways to manage packages, and two prominent methods are using `npx` and installing packages globally. Both approaches have their strengths and considerations, catering to different scenarios in the development workflow.

## Global Installations

Global installations involve storing a package in a central location on the system, making it accessible from any project. The command for global installations is as follows:

```bash
npm install -g package-name
```

### Pros of Global Installations

1. **Access Anywhere:** Once globally installed, the package becomes available to any project on the machine, reducing the need for redundant installations.

2. **Command-Line Accessibility:** Global packages often include command-line tools, providing convenient access from any terminal window.

### Cons of Global Installations

1. **Version Conflicts:** Global installations can lead to version conflicts, especially when different projects depend on different versions of the same package.

2. **Limited Project Isolation:** Global packages may introduce dependencies conflicting with a project's specific requirements, potentially causing issues.

## `npx`: A Modern Alternative

`npx` is a npm package runner tool that comes bundled with npm (version 5.2.0 and above). It enables developers to execute binaries from locally installed npm packages without the need for a global installation. The syntax is simple:

```bash
npx package-name
```

### Pros of Using `npx`

1. **Version Agnosticism:** `npx` automatically uses the locally installed version of a package, eliminating version conflicts between projects.

2. **No Global Pollution:** Since `npx` runs packages locally, it avoids cluttering the global space with potentially conflicting dependencies.

3. **Temporary Usage:** `npx` is excellent for executing packages sporadically, without the need for a permanent global installation.

### Cons of Using `npx`

1. **Slower Execution:** Running a package with `npx` may take longer than using a globally installed version, as it needs to download and install the package temporarily.

2. **Requires Internet:** `npx` requires an internet connection to download packages if they are not already available locally.

## Choosing the Right Approach

The decision between `npx` and global installations depends on the specific requirements of the project and development workflow. Here are some guidelines to consider:

- **Use `npx` for Temporary Tasks:** When dealing with occasional tasks or packages that are not needed globally, `npx` is a convenient choice.

- **Global Installations for Frequent Use:** If a package is used frequently across various projects, a global installation may be more efficient.

- **Consider Project Isolation:** For projects that demand strict version control and isolation, `npx` is preferable to avoid conflicts.

- **Check Documentation:** Some packages recommend a specific installation method in their documentation. Always refer to the documentation of the package in question.

In conclusion, both `npx` and global installations serve their purposes in the npm ecosystem. Developers should weigh the advantages and disadvantages of each method based on the specific needs of their projects. Whether opting for the traditional global approach or embracing the modern `npx` tool, npm provides the flexibility needed to manage packages effectively in diverse development scenarios.

P.s. if you get `permission denied` when trying to install globally, chekout [This Issue](https://github.com/Tokels/app/issues/44)
