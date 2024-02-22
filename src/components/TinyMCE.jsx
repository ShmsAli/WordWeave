import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

function TinyMCE({ control, name, defaultValue='' }) {

  return (
    <>
      <label htmlFor={name}>Content</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Editor
            id={name}
            onBeforeRenderUI={() => console.log("onBeforeRenderUI")}
            apiKey='zzsjgrsdgqhd2owz3yk37vw78yuevrpcrumem6tw75trnpka'
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                'advlist','codesample', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic backcolor forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'table|codesample|removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={onChange}
          />

        )}
      />
    </>
  );
}

TinyMCE.propTypes = {
  control:PropTypes.object,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
}

export default TinyMCE;
