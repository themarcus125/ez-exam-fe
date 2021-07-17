import * as React from "react";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <div>
      <div>
        <p>If you're a examinee</p>
        <Link to="/examinee">Go to examinee dashboard</Link>
      </div>
      <br />
      <div>
        <p>If you're a examiner</p>
        <Link to="/examiner">Go to examiner dashboard</Link>
      </div>
      <br />
      <div>
        <p>If you're a examiner</p>
        <Link to="/examtaker">Go to examtaker test</Link>
      </div>
    </div>
  );
};

export default IndexPage;
