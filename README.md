# GDScript Formatter Frontend

Welcome to the GDScript Formatter Frontend! This user-friendly web application is designed for formatting, linting, and converting GDScript. The frontend is publicly accessible at [https://www.gdscriptformatter.com/](https://www.gdscriptformatter.com/), providing an intuitive interface powered by Next.js, React, and Tailwind CSS. The backend for this site can be found [here](https://github.com/dec-land/gd-format-backend).

---

## TODO

- [x] Refactor pages into smaller reusable components
- [x] Add an About page
- [x] Add a privacy policy
- [x] Add a buy me a coffee donate button
- [x] Refactor pages into smaller reusable components
- [ ] Add changelog to about section? 
- [ ] Add Contact Form
- [ ] Add a continue button to the converter, for if code has been cut off (incomplete) for larger inputs.
- [ ] Add test coverage.
- [ ] Add rate limit for conversions.
- [ ] Improve error handling for Chat GPT errors (rate limit etc).
- [ ] Add persistence to output if user navigates to another page
- [ ] Add proper eslint + prettier configs
- [ ] Add husky pre commit hooks for build, eslint + prettier, and tests when implemented
- [ ] Improve error handling for Chat GPT errors (rate limit etc).
- [ ] Add a paypal donate button (instead)
- [ ] Sort ad placement when accepted by adsense :cry:
- [ ] Move axios calls into server api components
- [ ] Add ability to specify line length for formatting
= [ ] Add support for Godot 3 GDScript

---

## Getting Started

First, install pnpm if you haven't already:

```bash
npm install -g pnpm
```

Secondly, install required modules:

```bash
pnpm install
```

Thirdly, run the development server:

```bash
pnpm dev
```

The server should then be accessible at [http://localhost:3001](http://localhost:3001/health)

## Features

### 1. GDScript Formatting Page

Visit [https://www.gdscriptformatter.com/format](https://www.gdscriptformatter.com/format) to utilize the GDScript formatting feature.

### 2. GDScript Linting Page

Access [https://www.gdscriptformatter.com/lint](https://www.gdscriptformatter.com/lint) to perform linting on your GDScript code.

### 3. GDScript to C# / C# to GDScript Conversion Page

Navigate to [https://www.gdscriptformatter.com/convert](https://www.gdscriptformatter.com/convert) to convert GDScript code to C# or C# to GDScript.

## Deployment

The GDScript Formatter Frontend is automatically deployed using Vercel. The deployment process is triggered automatically upon changes to main, ensuring that the latest features are always available on [https://www.gdscriptformatter.com/](https://www.gdscriptformatter.com/).

### Deployment Details

- **Hosting Platform:** [Vercel](https://vercel.com/)
- **Automatic Deployment:** Yes
- **Access the Frontend:** [https://www.gdscriptformatter.com/](https://www.gdscriptformatter.com/)

Feel free to explore the GDScript Formatter Frontend. If you have any feedback, encounter issues, or have suggestions for improvements, please don't hesitate to reach out. Contributions are always welcome!

Happy coding and formatting!