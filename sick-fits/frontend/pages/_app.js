import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { Page } from '../components';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on('routeChangeComplete', () => NProgress.done());

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

App.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;

  return {
    pageProps,
  }
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default withData(App);
