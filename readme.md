# Integrating Lighthouse-CI (Github)


### What is Lighthouse?
- Lighthouse is an open-source, automated tool for improving the performance, quality, and correctness of your web apps.


- When auditing a page, Lighthouse runs a barrage of tests against the page, and then generates a report on how well the page did. 


- From here you can use the failing tests as indicators on what you can do to improve your app.   

### What is Lighthouse-CI?

- Lighthouse CI is a suite of tools that make continuously running, saving, retrieving, and asserting against Lighthouse results as easy as possible.

### Integrating Lighthouse-CI On Static Pages

### Step 1
  - Create a js file called lighthouserc.js. This will serve as the config file of the lighthouse-CI
  - Add this file in the root folder of the project.
  - The file should contain the following code:
    
    ````
     module.exports = {
      ci: {
        collect: {
          staticDistDir: './',
        },
        upload: {
          target: 'filesystem',
          outputDir: "./lhci"
        },
      },
    };
    ````
  Notes: 
  - collect allows us to designate which folder contains the files to be audited by Lighthouse CI
  - upload represents where LH reports will be stored.
    - filesystem will save the reports in a temporary directory in Github.
    - outputDir represents the folder to save the reports in.
    - If target is "temporary-public-storage", reports will be generated in a temporary online webpage.


### Step 2
    - Create a new folder called .github and a folder called workflows inside of it.
    - Create a new file called ci.yaml
    - In the yaml file, add the following code:

```
name: CI
on: [push]
jobs:
  lhci:
    name: Lighthouse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 16.x
        uses: actions/setup-node@v1
        with:
          node-version: 16.x
    - name: run Lighthouse CI
      run: |
        npm install -g @lhci/cli@0.9.x
        lhci autorun
    - run: mkdir -p /home/runner/work/newRepo1/newRepo1/
    - uses: actions/upload-artifact@v3
        with:
          name: lhci-reports
          path: /home/runner/work/newRepo1/newRepo1/lhci
```
You can also copy the contents of the yaml file to keep the proper indentations:


![ci yaml content](/readme-images/ci-yaml.png "ci.yaml content")

Notes:
- replace "newRepo1" with the actual repo name.
- yaml file serves contains commands to run and automate the Lighthouse report generation per push.


### Step 3:
  
  - Return to your repo and select the actions tab
  - This will contain the action and the status of our Lighthouse report generation
  - Select your latest commit:

  ![ci yaml content](/readme-images/ci-yaml.png "ci.yaml content")
