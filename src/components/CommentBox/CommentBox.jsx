import React, { useState } from "react";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import styles from "./CommentBox.module.css";
import { showDateTime } from "../../utils/util";
import CommentInput from "../CommentInput/CommentInput";

export default function CommentBox({
  type,
  comment,
  handleAddComment,
  handleDeleteComments,
  commentId,
}) {
  const [showInput, setShowInput] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {isEdit ? (
        <CommentInput
          type={type}
          onSubmit={(data, isComment, commentId) => {
            setIsEdit(false);
            handleAddComment(data, isComment, commentId);
          }}
          id={comment.id}
          commentId={commentId}
          initialValue={{ name: comment.name, text: comment.text }}
        />
      ) : (
        <div
          className={type === "comment" ? styles.commentBox : styles.replyBox}
        >
          <div className={styles.commentHeader}>
            <p className={styles.commentName}>{comment.name}</p>
            <p
              className={styles.commentDate}
              title={showDateTime(comment.created_at)}
            >
              {showDateTime(comment.updated_at)}
              {comment.created_at !== comment.updated_at && "(Edited)"}
            </p>
          </div>
          <p className={styles.commentText}>{comment.text}</p>
          <div className={styles.commentActions}>
            {type === "comment" && (
              <div
                className={styles.commentReply}
                role="button"
                onClick={() => setShowInput(!showInput)}
              >
                Reply
              </div>
            )}
            <div
              className={styles.commentEdit}
              role="button"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </div>
          </div>
          <button
            className={styles.commentDelete}
            title="Delete"
            onClick={() => {
              handleDeleteComments(comment.id, commentId, type === "comment");
            }}
          >
            <img
              src={DeleteIcon}
              width={14}
              height={14}
              alt="delete comment/reply"
            />
          </button>
        </div>
      )}
      {showInput && (
        <CommentInput
          type="reply"
          onSubmit={(data, isComment, commentId) => {
            setShowInput(false);
            handleAddComment(data, isComment, commentId);
          }}
          commentId={comment ? comment.id : null}
        />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map((reply) => (
            <CommentBox
              key={reply.id}
              type="reply"
              comment={reply}
              handleAddComment={handleAddComment}
              handleDeleteComments={handleDeleteComments}
              commentId={comment.id}
            />
          ))}
        </div>
      )}
    </>
  );
}
