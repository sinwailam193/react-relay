import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                id
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

export default function Link(props) {
    const { index, link: { id, description, url, votes, postedBy, createdAt }, updateVoteStore } = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const [voteMutation] = useMutation(VOTE_MUTATION, {
        variables: { linkId: id },
        update: (cache, { data: { vote } }) => updateVoteStore(cache, vote, id)
    });

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{index + 1}.</span>
                {authToken && (
                    <div className="ml1 gray f11" onClick={voteMutation}>
                        ▲
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {description} ({url})
                </div>
            <div className="f6 lh-copy gray">
                {votes.length} votes | by{' '}
                {postedBy
                    ? postedBy.name
                    : 'Unknown'}{' '}
                {timeDifferenceForDate(createdAt)}
            </div>
            </div>
        </div>
    )
}