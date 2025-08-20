import React from "react";

const BackDrop = ({ onClick }) => (
    <div
        className="fixed inset-0 z-30 bg-black/10 transition-all"
        onClick={onClick}
    />
);

export default BackDrop;
