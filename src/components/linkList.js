import React, { useEffect } from "react";
import gql from 'graphql-tag'
import { useQuery } from "@apollo/react-hooks";

import Link from "./link";

const NEW_VOTES_SUBSCRIPTION = gql`
    subscription newVoteSubscription {
        newVote {
            id
            link {
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
            user {
                id
            }
        }
    }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
    subscription newLinkSubscription {
        newLink {
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
`;

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

// using subscription
function subscribeToNewLinks(subscribeToMore) {
    subscribeToMore({
        document: NEW_LINKS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
                return prev;
            }
            const newLink = subscriptionData.data.newLink;
            const exists = prev.feed.links.find(({ id }) => id === newLink.id);
            if (exists) {
                return prev;
            }

            return Object.assign({}, prev, {
                feed: {
                    ...prev.feed,
                    links: [...prev.feed.links, newLink],
                    count: prev.feed.links.length + 1,
                }
            });
        }
    });
}

// using subscription
function subscribeToNewVotes(subscribeToMore) {
    subscribeToMore({
        document: NEW_VOTES_SUBSCRIPTION
    });
}

export default function Linklist() {
    const { loading, error, data, subscribeToMore } = useQuery(GET_LINKS);
    useEffect(() => {
        subscribeToNewLinks(subscribeToMore);
        subscribeToNewVotes(subscribeToMore);
    }, [subscribeToMore]);

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