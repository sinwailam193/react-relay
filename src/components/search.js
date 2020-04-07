import React, { useState } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

import Link from "./link";

const FEED_SEARCH_QUERY = gql`
    query feedSearchQuery($filter: String!) {
        feed(filter: $filter) {
            links {
                id
                url
                description
                createdAt
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
    }
`;

export default function Search() {
    const [links, setLinks] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterQuery, { data, loading }] = useLazyQuery(
        FEED_SEARCH_QUERY,
        {
            onCompleted: () => {
                setFilter("");
                setLinks(data.feed.links);
            }
        }
    );

    return (
        <div>
            <div>
                Search
                <input
                    type='text'
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
                <button onClick={() => { 
                    if (!loading) {
                        filterQuery({ variables: { filter } });
                    }
                }}>{loading ? "loading..." : "ok"}</button>
            </div>
            {links.map((link, index) => (
                <Link key={link.id} link={link} index={index} />
            ))}
        </div>
    )
}
