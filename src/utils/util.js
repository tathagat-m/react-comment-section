//Take Date.now() as input and return a Date & Time string
export function showDateTime(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
}

//Deep Sort the comments Array
export const handleDeepSortComments = (unsortedComments, isSortAscending) => {
  const sortComments = (comments) => {
    return comments.sort((a, b) => {
      if (isSortAscending) {
        return a.updated_at - b.updated_at;
      } else {
        return b.updated_at - a.updated_at;
      }
    });
  };

  const sortReplies = (comments) => {
    comments.forEach((comment) => {
      if (comment.replies && comment.replies.length > 1) {
        comment.replies = sortComments(comment.replies);
      }
    });
  };

  let sortedComments = [...unsortedComments];
  sortedComments = sortComments(sortedComments);
  sortReplies(sortedComments);

  return sortedComments;
};
