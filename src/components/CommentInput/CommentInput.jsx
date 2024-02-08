import React, { useEffect, useRef, useState } from "react";
import styles from "./CommentInput.module.css";

export default function CommentInput({
  type = "comment",
  onSubmit,
  id = undefined,
  commentId = null,
  initialValue = null,
}) {
  const nameRef = useRef("");
  const commentRef = useRef("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    if (nameRef.current.value === "" || commentRef.current.value === "") {
      console.log("Submit Cancelled");
      setError(true);
      return;
    }

    onSubmit(
      {
        id: id,
        name: nameRef.current.value.trim(),
        comment: commentRef.current.value.trim(),
      },
      type === "comment" ? true : false,
      commentId
    );

    nameRef.current.value = "";
    commentRef.current.value = "";
  };

  useEffect(() => {
    if (initialValue) {
      nameRef.current.value = initialValue.name;
      commentRef.current.value = initialValue.text;
      commentRef.current.focus();
    } else {
      nameRef.current.focus();
    }
  }, [initialValue]);

  return (
    <div
      className={type === "comment" ? styles.commentInput : styles.replyInput}
    >
      <p className={styles.commentInputTitle}>
        {type === "comment" ? "Comment" : "Reply"}
      </p>
      <input
        ref={nameRef}
        className={`${styles.nameInput} ${error && styles.inputError}`}
        type="text"
        placeholder="Name*"
        onKeyDown={(e) => {
          setError(false);
        }}
        disabled={initialValue && initialValue.name}
      />
      <textarea
        ref={commentRef}
        className={`${styles.commentText} ${error && styles.inputError}`}
        rows={2}
        placeholder={type === "comment" ? "Comment" : "Reply"}
        onKeyDown={(e) => {
          setError(false);
        }}
      />
      <button className={styles.commentSubmit} onClick={handleSubmit}>
        Post
      </button>
      {error && (
        <p className={styles.commentError}>
          Please fill all the fields<sup>*</sup>
        </p>
      )}
    </div>
  );
}
