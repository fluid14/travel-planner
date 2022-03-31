import React, { useEffect, useRef } from 'react';

function TextEditor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    };
  }, []);

  const editorConfiguration = {
    toolbar: [
      'bold',
      'italic',
      '|',
      'link',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'undo',
      'redo'
    ],
    fontSize: { value: 14 }
  };

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => onChange(editor.getData())}
          config={editorConfiguration}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default TextEditor;
