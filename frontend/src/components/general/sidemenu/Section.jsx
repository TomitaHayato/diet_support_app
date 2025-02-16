function Section(props) {
  const {children} = props;

  return(
    <>
      <hr className="mb-3 border-gray-400"/>
      <div className="mb-5">{children}</div>
    </>
  )
}

export default Section;
