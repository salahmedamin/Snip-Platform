function Or(props) {
  const {text,border,width,or} = props
  return (
    <center className={`d-flex justify-content-center align-items-center text-${text} w-${width} my-4 mx-6`}>
        <div className={`col-6 border-top border-${border}`}></div><span className="mx-4 muted">{or}</span><div className={`col-6 border-top border-${border}`}></div>
    </center>
  );
}

export default Or;
