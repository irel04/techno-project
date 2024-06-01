function GoogleMap({ src }) {
  return (
    <iframe
      title="Google Map"
      src={src}
      width="600px"
      height="450px"
      frameBorder="0"
      style={{ border: 0 }}
      allowFullScreen=""
      aria-hidden="false"
      tabIndex="0"
    ></iframe>
  );
}

export default GoogleMap;
