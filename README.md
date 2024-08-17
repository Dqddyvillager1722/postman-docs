![Postman logo](https://assets.getpostman.com/common-share/postman-github-logo.png "Postman logo")

# Postman Learning Center

Postman is the collaboration platform for API development. The [Postman Learning Center](https://learning.postman.com/) has the resources you need to ramp up quickly and extend your skills with Postman. Postman enables you to write API test cases in any format of your choice (JSON/XML/many more) and run them to verify and validate your API. Moreover, Postman provides [collections](https://learning.postman.com/docs/getting-started/creating-the-first-collection/) which can improve a developer's workflow. There are also powerful tools for API-first development, including writing API schemas and generating server code. Postman is available for several platforms including Windows, macOS, and Linux. For more information visit [the Postman website](https://www.postman.com/).

## Contribution guidelines

We would love for you to contribute to the Learning Center! To contribute to this project, please read:

* The [Code of Conduct](https://www.postman.com/code-of-conduct)
* The [Contribution Guidelines](CONTRIBUTING.md)
* The [Documentation Style Guide](DOCS_STYLE_GUIDE.md)

**NOTE:** We have added a new Markdown linter with GitHub Actions. When making a pull request, it will run against this linter. Your changed files are required to pass linting before they will be merged. More information on this can be found in the [contribution guidelines](CONTRIBUTING.md).

> To say thank you for your contribution, we’d love to send you exclusive Contributor swag. Fill out the [Contributor Submission form](https://docs.google.com/forms/d/e/1FAIpQLSfbLAcxl-IOiv3NmgEaWw7FleOaXnIyIoIrY_zn6U4JvjQBGA/viewform?usp=send_form) and we’ll send you a token of our gratitude.

## Build the Learning Center locally

```shell

   $ git clone https://github.com/postmanlabs/postman-docs.git
   $ cd postman-docs
   $ npm install
   $ npm install -g gatsby-cli
   $ npm run dev

```

**NOTE:** this site was built with node v12.13.0. We recommend installing and using [nvm](https://github.com/nvm-sh/nvm) and setting your node version to v12.13.0.

### Build using Docker

You can build the Learning Center and run it in a Docker container by creating a `dockerfile`.

1. Start by cloning the the repository

   `git clone https://github.com/postmanlabs/postman-docs.git`

2. Create a file and name it `dockerfile` with the following contents:

    ```shell

    FROM node:12

    EXPOSE 8000

    # copy the postman-docs project directory
    COPY postman-docs /var/postman-docs

    WORKDIR "/var/postman-docs"

    RUN npm install -g gatsby-cli
    RUN npm install --force

    CMD ["yarn", "dev", "-H", "0.0.0.0" ]

    ```

    The `dockerfile` should be in the same directory as the `postman-docs` directory

    ```shell

    # example directory structure
    |--[current folder]
       |--postman-docs
       |--dockerfile

    ```

3. Build the Docker image with this command:

   `$ docker build --tag postman-docs:1.0 .`

4. Start a container using the image

   `$ docker run -p 8000:8000 -d postman-docs:1.0`

#### Docker Compose

You can also build with the `docker-compose` command using the dockerfile above 