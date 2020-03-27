import Document, { Head, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document {
    public static async getInitialProps(ctx: any) {
        const isProduction = process.env.NODE_ENV === "production";
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App: any) => (props: any) =>
                        sheet.collectStyles(<App {...props} />)
                });
            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                isProduction,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    public setGoogleTags() {
        return {
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-142981522-1');
            `
        };
    }

    public render() {
        const isProduction = this.props;

        return (
            <html lang="en">
                <Head>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                        key="viewport"
                    />
                    <link
                        rel="shortcut icon"
                        type="image/x-icon"
                        href="/static/favicon.ico"
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                    {isProduction && (
                        <React.Fragment>
                            <script
                                async
                                src="https://www.googletagmanager.com/gtag/js?id=UA-142981522-1"
                            />
                            <script
                                dangerouslySetInnerHTML={this.setGoogleTags()}
                            />
                        </React.Fragment>
                    )}
                </body>
            </html>
        );
    }
}
