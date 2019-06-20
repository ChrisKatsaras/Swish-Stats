import document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends document {
    public static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();

        const page = renderPage(App => props =>
            sheet.collectStyles(<App {...props} />)
        );

        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags };
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
                    {this.props.styleTags}
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
