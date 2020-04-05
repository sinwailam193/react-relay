import React from "react";
import gql from 'graphql-tag'
import { useQuery } from "@apollo/react-hooks";

import Link from "./link";

export const GET_LINKS = gql`
    query getFeed {
        feed {
            links {
                id
                description
                url
            }
        }
    }
`;

export default function Linklist() {
    const { loading, error, data } = useQuery(GET_LINKS);

    if (loading) {
        return <p>Fetching...</p>
    } else if (error) {
        return <p>There is an error</p>
    }
    return <div>{data.feed.links.map(link => <Link key={link.id} link={link} />)}</div>;
}