github-api-demo
===============

A simple demonstration of GitHub's public API.

### Node/NPM Versions Used

**Node:** v8.10.0 (ES2015) <br>
**NPM:** v6.4.1

Usage
-----

First, make sure that After pulling down the repository and running `npm install`, run

```
node . <username>
```

where `<username>` is any GitHub username. For example,
`node . connor-minton`. The output is the weighted
average of the user's GitHub events with the weights as follows:

| Event Type | Weight |
|---|---|
| PushEvent | 4 |
| PullRequestReviewCommentEvent | 3 |
| ReleaseEvent | 2 |
| [other event] | 1 |


Development
-----------

Simply follow the steps in "Usage". Your dev environment should be set up
correctly if you can run the example usage command.

Before committing code, make sure that the linting and
tests pass. You can check that this is the case by running

```
npm run lint
npm test
```
