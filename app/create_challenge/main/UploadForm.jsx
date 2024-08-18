import React from 'react';

const UploadForm = ({ selectedCategory }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Upload a video for {selectedCategory}
      </h1>
      <input type="file" accept="video/*" />
    </div>
  );
};

export default UploadForm;