import React from "react";
import gql from 'graphql-tag'
import { Query } from "react-apollo";

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
    return (
        <Query query={GET_LINKS}>
            {({ loading, error, data }) => {
                if (loading) {
                    return <p>Fetching...</p>
                } else if (error) {
                    return <p>There is an error</p>
                }
                return <div>{data.feed.links.map(link => <Link key={link.id} link={link} />)}</div>
            }}
        </Query>
    )
}