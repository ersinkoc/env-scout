# Contributing to @oxog/env-scout

First off, thank you for considering contributing to env-scout! 

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what behavior you expected
- Include your environment details (OS, browser, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- Explain why this enhancement would be useful
- List any alternative solutions you've considered

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes (`npm test`)
4. Make sure your code lints (`npm run lint`)
5. Update the documentation if needed

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/env-scout.git
cd env-scout

# Install dependencies
npm install

# Run tests in watch mode
npm test

# Build the package
npm run build
```

## Style Guide

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new functionality
- Keep dependencies to zero (this is a zero-dependency library)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.