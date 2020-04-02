import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { GET_LINKS } from "./linkList";

const CREATE_LINK = gql`
    mutation createLink($description: String!, $url: String!) {
        createLink(data:{
            description: $description,
            url: $url
        }) {
            id
            createdAt
            url
            description
        }
    }
`;

export default function Createlink() {
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
                update={(cache, { data: { createLink } }) => {
                    const { links } = cache.readQuery({ query: GET_LINKS });
                    cache.writeQuery({
                        query: GET_LINKS,
                        data: { links: links.concat(createLink) }
                    })
                }}
            >
                {createLink => <button onClick={createLink}>Submit</button>}
            </Mutation>
        </div>
      )
}