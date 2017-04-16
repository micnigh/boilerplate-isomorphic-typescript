import * as React from "react";
import Navigation from "./component/navigation";

export class Base extends React.Component<any, any> {
  render() {
    return (
      <div className="page">
        <Navigation/>
        <div className="content">
          { this.props.children }
        </div>
        <div className="footer"/>
      </div>
    );
  }
}

export default Base;
