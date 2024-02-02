import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div>
      <h2>Hello Page Compoonit</h2>
      <h3>🍑</h3>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
