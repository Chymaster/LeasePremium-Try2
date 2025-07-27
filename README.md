# Lease Extension Premium Calculator

This is a front-end only application designed to help calculate the estimated lease extension premium. All calculations are performed directly in your browser, ensuring no personal data is collected or stored.

## Features

*   Calculates lease extension premium based on various inputs.
*   Supports different ground rent increase scenarios (doubling every 10/25 years, or percentage increase).
*   Provides a yearly breakdown of ground rent and premium contributions.
*   Compares the current premium with a hypothetical premium if renewed today, including additional ground rent paid.
*   Allows adjustment of the capitalisation rate.

## Disclaimer

This tool is only to be used for reference. The calculation primarily accounts for the loss of ground rent based on a capitalization rate assumption of 6%. Other significant costs, such as reversionary interest and solicitor fees, are not included. Please consult your solicitor for a professional quote.

## Deployment

This application is designed for easy deployment to static hosting services. It can be deployed to [Cloudflare Workers](https://workers.cloudflare.com/) using [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (Cloudflare's CLI tool).

## Live Demo

You can access a live version of this calculator at: [https://leaseextensionpremium.uk/](https://leaseextensionpremium.uk/)

## Source Code

If you're interested in the technical details or want to contribute, please take a look at the source code on [GitHub](https://github.com/Chymaster/LeasePremium-Try2).

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).
