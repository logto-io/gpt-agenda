# gpt-agenda

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flogto-io%2Fgpt-agenda&env=LOGTO_ENDPOINT&envDescription=You%20may%20need%20to%20set%20more%20variables%20to%20make%20the%20app%20full-functional.&envLink=https%3A%2F%2Fgithub.com%2Flogto-io%2Fgpt-agenda&project-name=gpt-agenda&repository-name=gpt-agenda&demo-title=GPT%20Agenda&demo-description=The%20GPT%20Agenda%20demo%20app%20created%20by%20Logto.&demo-url=https%3A%2F%2Fgpt-agenda.fordemo.app%2F&demo-image=https%3A%2F%2Fgithub.com%2Flogto-io%2Fgpt-agenda%2Fassets%2F14722250%2F457529ed-ef6f-433f-a3fe-d615074c4071)

This is the repository of the GPT agenda app for the tutorial [Authenticate users in GPT actions: Build a personal agenda assistant](https://blog.logto.io/gpt-action-oauth/).

The result is available on [gpt-agenda.fordemo.app](https://gpt-agenda.fordemo.app/).

![Preview](https://github.com/logto-io/gpt-agenda/assets/14722250/5db10db6-9c12-483b-bb35-6e60b2126dd7)

The project is based on [Next.js](https://nextjs.org/) app router, and consists of two parts:

- A set of REST APIs to manage the agenda items ([src/app/api/](src/app/api/)). 
- A web app that allows users to monitor agenda items ([src/app/page.tsx](src/app/page.tsx)).

## OpenAPI specification

The OpenAPI specification of the REST APIs is available at [swagger.yaml](swagger.yaml). It is used for the GPT action definition.

## Token validation

The REST APIs parse the `Authorization` header to get the access token and leverage the [Userinfo endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo) to validate the token. See [getUserById](src/utils/user.ts) for details.

## Development

This project uses [pnpm](https://pnpm.io/) as the package manager.

Install dependencies:

```bash
pnpm i
```

Start the dev server:

```bash
pnpm dev
```

### Environment variables

To run the REST APIs, you need to set the following environment variable:

- `LOGTO_ENDPOINT`: The endpoint of your Logto tenant. It can be found in the application details page of Logto Console.

To run the web app, besides the above environment variable, you also need to set the following environment variables:

- `LOGTO_APP_ID`: The ID of the Logto application.
- `LOGTO_APP_SECRET`: The secret of the Logto application.
- `LOGTO_COOKIE_SECRET`: The secret used to sign the cookie.
- `BASE_URL`: The base URL of the web app. It is used to generate the callback URL for OAuth.

> [!Note]
> The web app should use a separate Logto application from the GPT actions.
