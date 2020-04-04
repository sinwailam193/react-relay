import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { GET_LINKS } from "./linkList";

const CREATE_LINK = gql`
    mutation postFeed($description: String!, $url: String!) {
        link: post(
            description: $description,
            url: $url
        ) {
            id
            createdAt
            url
            description
        }
    }
`;

export default function Createlink(props) {
    const { push } = props.history;
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    return (
        <div>
            <div className="flex flex-column mt3">
                <input
                    className="mb2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    placeholder="A description for the link"
                />
                <input
                    className="mb2"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    type="text"
                    placeholder="The URL for the link"
                />
            </div>
            <Mutation 
                mutation={CREATE_LINK} 
                variables={{ description, url}}
                // add the item into the list
                update={(cache, { data: { link } }) => {
                    const { feed, feed: { links } } = cache.readQuery({ query: GET_LINKS });
                    cache.writeQuery({
                        query: GET_LINKS,
                        data: {
                            feed: {
                                ...feed,
                                links: links.concat(link)
                            }
                        }
                    });
                }}
                // on complete we route back to the origin page
                onCompleted={() => push("/")}
            >
                {postFeed => <button onClick={postFeed}>Submit</button>}
            </Mutation>
        </div>
      )
}