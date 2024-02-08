import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Comments.module.css";
import CommentBox from "../CommentBox/CommentBox";
import CommentInput from "../CommentInput/CommentInput";

/*
Reference Data Structure for comments and replies
[
  {
    id: "1234",
    type: "comment",
    name: "Shyam Sundar",
    created_at: Date.now(),
    updated_at: Date.now(),
    text: "This is a comment....Nice!",
    replies: [
      {
        id: "12345",
        type: "reply",
        name: "Shyam Sundar",
        created_at: Date.now(),
        updated_at: Date.now(),
        text: "This is a reply....Nice!",
      },
      {
        id: "123456",
        type: "reply",
        name: "Sam Bahadur",
        created_at: Date.now(),
        updated_at: Date.now(),
        text: "This is a reply....Nice!",
      },
    ],
  },
]
*/

const handleSortComments = (unsortedComments, isSortAscending) => {
  console.log("Before Sort: ", unsortedComments);
  let tempComments = [];
  //Sort the comments in ascending order
  if (isSortAscending) {
    tempComments = unsortedComments.sort((a, b) => {
      return a.updated_at - b.updated_at;
    });
  } else {
    //Sort in descending order
    tempComments = unsortedComments.sort((a, b) => {
      return b.updated_at - a.updated_at;
    });
  }

  console.log("After Sort: ", tempComments);
  return tempComments;
};

export default function Comments() {
  const oldComments = JSON.parse(localStorage.getItem("comments"));
  const [isSortAscending, setIsSortAscending] = useState(true);
  const [comments, setComments] = useState(
    oldComments ? handleSortComments(oldComments, isSortAscending) : []
  );

  const handleAddComment = (data, isComment, commentId = null) => {
    //handle comments
    if (isComment && !commentId) {
      setComments(
        handleSortComments(
          [
            ...comments,
            {
              id: uuidv4(),
              type: isComment ? "comment" : "reply",
              name: data.name,
              created_at: Date.now(),
              updated_at: Date.now(),
              text: data.comment,
              replies: [],
            },
          ],
          isSortAscending
        )
      );
    } else if (isComment && commentId) {
      //handle Comment Edits
      const tempComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            name: data.name,
            updated_at: Date.now(),
            text: data.comment,
          };
        }
        return { ...comment };
      });
      setComments([...tempComments]);
    } else if (commentId && !isComment && data && data.id) {
      //handle reply edits
      const tempComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === data.id) {
                return {
                  ...reply,
                  updated_at: Date.now(),
                  text: data.comment,
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      });
      setComments([...tempComments]);
    } else {
      //handle replies
      const tempComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: uuidv4(),
                type: isComment ? "comment" : "reply",
                name: data.name,
                created_at: Date.now(),
                updated_at: Date.now(),
                text: data.comment,
              },
            ],
          };
        }

        return { ...comment };
      });
      setComments([...tempComments]);
    }
  };

  const handleDeleteComments = (id, commentId, isComment) => {
    if (isComment) {
      //handle comment delete
      const tempComments = comments.filter((comment) => comment.id !== id);
      setComments([...tempComments]);
    } else if (!isComment && commentId) {
      //handle reply delete
      const tempComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== id),
          };
        }
        return { ...comment };
      });
      setComments([...tempComments]);
    } else {
      //handle comment delete
      const tempComments = comments.filter((comment) => comment.id !== id);
      setComments([...tempComments]);
    }
  };

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <>
      <CommentInput type="comment" onSubmit={handleAddComment} />

      {comments.length > 0 ? (
        <div className={styles.commentsWrapper}>
          <button
            className={styles.sortBtn}
            onClick={() => {
              setComments(handleSortComments(comments, !isSortAscending));
              setIsSortAscending(!isSortAscending);
            }}
          >
            Sort By: Date & Time {isSortAscending ? "↑" : "↓"}
          </button>
          {comments.map((comment) => (
            <CommentBox
              key={comment.updated_at}
              type={comment.type}
              comment={comment}
              handleAddComment={handleAddComment}
              handleDeleteComments={handleDeleteComments}
              commentId={comment.id}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noComments}>
          <span className={styles.noCommentsTitle}>No Comments</span>
          <span className={styles.noCommentsSubtitle}>
            Please add a comment from the above input box.
          </span>
        </div>
      )}
    </>
  );
}
