import React from "react";

const page: React.FC = (req, res) => {
const {postId} = req.query.id
    return(
<div>{postId}</div>
    )
};

export default page;