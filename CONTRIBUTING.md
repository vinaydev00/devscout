# Contributing to DevScout

Thank you for your interest in contributing to DevScout! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and constructive in all interactions. We're committed to making this an inclusive and welcoming community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/devscout.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Push to your branch: `git push origin feature/your-feature-name`
6. Open a Pull Request

## Development Setup

```bash
# Install dependencies
npm install
cd client && npm install && cd ..

# Start development server
npm run dev

# Run linting
npm run lint

# Run tests
npm test
```

## Code Standards

- Use TypeScript for type safety
- Follow ESLint rules (run `npm run lint`)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## Pull Request Process

1. Ensure your code passes linting: `npm run lint`
2. Ensure tests pass: `npm test`
3. Update README.md if needed
4. Provide a clear description of your changes
5. Link related issues if applicable

## Types of Contributions

### Bug Reports
- Use the issue tracker
- Provide reproduction steps
- Include error messages and logs

### Feature Requests
- Describe the use case
- Explain the expected behavior
- Provide examples if applicable

### Code Improvements
- Follow existing code style
- Add comments for complex logic
- Consider performance implications

## Architecture

The project is organized as follows:
- **Backend** (`src/`): Express server, GitHub API integration, scoring logic
- **Frontend** (`client/src/`): React components, UI styling
- **Build**: Vite for client, TypeScript for server

## Scoring Algorithm

If modifying the scoring logic in `src/scorer.ts`:
- Maintain the 0-100 scale
- Keep component weights balanced
- Document any changes clearly
- Test edge cases

## Release Process

Releases follow semantic versioning (MAJOR.MINOR.PATCH). The process:
1. Update version in package.json
2. Update CHANGELOG.md
3. Create a git tag
4. GitHub Actions automatically builds and publishes

## Questions?

- Check existing documentation
- Search closed issues for similar questions
- Open a new issue with your question

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to DevScout! 🎉
