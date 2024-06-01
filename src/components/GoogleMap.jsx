function GoogleMap({ src }) {
  return (
    <iframe
      title="Google Map"
      src={src}
      frameBorder="0"
      style={{ border: 0 }}
      allowFullScreen=""
      aria-hidden="false"
      tabIndex="0"
      className="w-full lg:w-[600px] lg:h-[450px]"
    ></iframe>
  );
}

export default GoogleMap;
