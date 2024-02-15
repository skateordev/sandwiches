import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import { Page } from '../components';
import withData from '../lib/withData';
import '../components/styles/nprogress.css';
import { CartStateProvider } from '../lib/cartState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on('routeChangeComplete', () => NProgress.done());

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

App.getInitialProps = async function getInitialPageProps({ Component, ctx }) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;

  return {
    pageProps,
  };
};

App.propTypes = {
  apollo: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  Component: PropTypes.func,
  pageProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  apollo: {},
  Component: () => { },
  pageProps: {},
};

export default withData(App);
