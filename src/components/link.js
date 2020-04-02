import React from "react";

export default function Link(props) {
    const { description, url } = props.link;
    return (
        <div>
          <div>
            {description} {url}
          </div>
        </div>
      )
}