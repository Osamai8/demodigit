import React, { useRef } from "react";
import { FormControl, FormHelperText, Grid } from "@material-ui/core";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from 'quill-image-resize-module-react';
import "react-quill/dist/quill.snow.css";
import { fetchWrapper } from "src/services/http_requests";
import { toast } from "react-toastify";
import { useMemo } from "react";

Quill.register('modules/imageResize', ImageResize);

const EditorTextArea = ({ onChange, value, errors, field }) => {
  const quillRef = useRef();
  const onTextChange = (content, delta, source, editor) => {
    if (editor.getLength() > 1) {
      onChange(field, editor.getHTML());
      return;
    }
    onChange(field, "");
  };

  const extention = ["png", "jpg", "JPEG", "jpeg", "svg"];

  const imageHandler = async (e) => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.["0"] || input.files[0];
      const selectedFileExtension = file.type.split("/");
      if (file) {
        if (selectedFileExtension && extention.includes(selectedFileExtension[1])) {
          try {
            const data = await fetchWrapper.s3UploadFile(file);
            if (data.success) {
              const url = data?.url;
              editor.insertEmbed(editor.getSelection(), "image", url);
            } else toast.error(data.message);
          } catch (error) {
            throw (error);
          }
        } else {
          toast.error("Please add png, jpg, JPEG, jpeg or svg only");
        }
      } else {
        toast.error("No file selected.");
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],

        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['link', 'image'],
      ],
      handlers: {
        image: imageHandler
      }
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  }), []);

  const formats = useMemo(() => [
    "header", "font",
    "size", "bold",
    "italic", "underline",
    "strike", "blockquote",
    "list", "bullet",
    "indent", "link",
    "image", "direction",
    "color", "align", "background"
  ], []);

  return (
    <Grid item md={12} xs={12}>
      <FormControl fullWidth>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={onTextChange}
          placeholder="Write learning module summary"
          style={{
            borderRadius: "10px",
            minHeight: "auto",
            // marginBottom: "",
          }}
        />
        <FormHelperText error={Boolean(errors)}>{errors}</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default EditorTextArea;
