import React from "react";
import gql from 'graphql-tag'
import { useQuery } from "@apollo/react-hooks";

import Link from "./link";

export const GET_LINKS = gql`
    query getFeed {
        feed {
            links {
                id
                createdAt
                description
                url
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

export default function Linklist() {
    const { loading, error, data } = useQuery(GET_LINKS);

    function updateVoteStore(cache, vote, id) {
        const { feed, feed: { links } } = cache.readQuery({ query: GET_LINKS });
        const votedLink = links.find(link => link.id === id);
        votedLink.votes = vote.link.votes;
        cache.writeQuery({ query: GET_LINKS, data: { feed: {
            ...feed,
            links
        } } });
    }

    if (loading) {
        return <p>Fetching...</p>
    } else if (error) {
        return <p>There is an error</p>
    }
    return <div>{data.feed.links.map((link, i) => <Link key={link.id} link={link} index={i} updateVoteStore={updateVoteStore} />)}</div>;
}