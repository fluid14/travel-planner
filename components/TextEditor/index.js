import React, { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false
});

export const TextEditor = ({ value, setFieldValue }) => {
  const draftToHtml = typeof window === 'object' && require('draftjs-to-html');

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    const forFormik = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setFieldValue(forFormik);
    setEditorState(editorState);
  };
  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="custom-wrapper"
        editorClassName="custom-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};
