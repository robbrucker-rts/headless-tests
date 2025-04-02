### Build: 
docker compose up --build

### Go to: 
http://localhost:3000?firstName=rob&lastName=bruck

### View results in Github: 
[https://github.com/robbrucker-rts/headless-tests/actions](https://github.com/robbrucker-rts/headless-tests/actions)

### More info
- View Github workflow yaml in .github/workflows/tests.yml
The yaml file contains the following:
  - The workflow is triggered on push and pull request events to the main branch
  - The workflow uses the latest version of the ubuntu-latest runner
  - The workflow checks out the code from the repository
  - The workflow sets up Node.js version 18
  - The workflow installs the dependencies using npm
  - The workflow runs the tests using npm test
  - The workflow caches the node_modules directory to speed up subsequent builds

  - The workflow runs the tests in headless mode

- A rule was configured in repo settings to run the tests on every push to the main branch as well as PR's against main

