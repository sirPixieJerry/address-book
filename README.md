# address-book

A small experiment aimed at developing an engine for managing forms.

In [this folder](https://github.com/sirPixieJerry/address-book/tree/master/src/components/CreateContactForm/store), you will find the engine I created for managing forms out of the box.

- `useForm`: This hook allows you to initialize a form and add it to the engine's internal state.
- `useFormContext`: This provides various methods to interact with your form, such as adding items or validating fields.

This repository is a work in progress and serves as a playground for eventually extracting the logic into a npm package, making it accessible for other projects.

I’m also showcasing this to demonstrate my approach to software development, offering insight into how I organize projects and the best practices I follow.

This project has been set up with `npm create vue@latest`.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### To Do:

- [ ] Remove artifacts from setting up the project with `npm create vue@latest`.
- [ ] Fix CSS bug cuased by autofill.
- [ ] Fix CSS bug when hovering form items.
- [ ] Improve Logic of UseForm for more flexibility.
- [ ] Add a wrapper component to encapsulate the logic now bound to FormInput.
