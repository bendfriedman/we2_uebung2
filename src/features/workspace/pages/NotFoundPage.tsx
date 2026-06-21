const NotFoundPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="display-4">404 - Not Found</h1>
      <p className="lead">The page you are looking for does not exist.</p>
      <hr className="my-4" />
      <p>Please check the URL or return to the homepage.</p>
      <a className="btn btn-primary btn-lg" href="/start" role="button">
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFoundPage;
