import { Icon } from '@adminjs/design-system';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import type { BasePropertyProps } from 'adminjs';
import React, { FC, useState } from 'react';
import { Editor } from '@ckeditor/ckeditor5-core';

const TextEditor: FC = (props: BasePropertyProps) => {
  const [editorData, setEditorData] = useState('');

  return (
    <div>
      <h2>Advanced CKEditor 5 in React</h2>
      <CKEditor
        // @ts-ignore
        editor={ClassicEditor}
        data={editorData}
        config={{
          // Additional configurations go here

          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'imageUpload',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            'alignment',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
          ],
          image: {
            toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side', 'linkImage'],
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties'],
          },
        }}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default TextEditor;
