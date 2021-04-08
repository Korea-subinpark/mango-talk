import '@testing-library/jest-dom/extend-expect';

// this is just a little hack to silence a warning that we'll get until react
const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (/.*is wrapped in a <Provider>/.test(args[0])) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});