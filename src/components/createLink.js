import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';

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
            postedBy {
                id
                name
            }
            votes {
                id
                user {
                    id
                }
            }
        }
    }
`;

export default function Createlink(props) {
    const { push } = props.history;
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [postFeed] = useMutation(CREATE_LINK, {
        variables: { url, description },
        // on complete we route back to the origin page
        onCompleted: () => push("/"),
        // add the item into the list
        update: (cache, { data: { link } }) => {
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
        }
    });

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
            <button onClick={postFeed}>Submit</button>
        </div>
      )
}