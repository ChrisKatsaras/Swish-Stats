import document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends document {
    public static async getInitialProps(ctx) {
        const initialProps = await document.getInitialProps(ctx);
        return { ...initialProps };
    }

    public render() {
        return (
            <Html>
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
                </body>
            </Html>
        );
    }
}

export default MyDocument;
