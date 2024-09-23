import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./style.css";
import { useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function Editer() {
  const location = useLocation();
  const [editor, setEditor] = useState(null);
  const [text, setText] = useState("");
  const { data } = location.state || {};

  useEffect(() => {
    const fetchResponse = async () => {
      setText(data);
    };

    fetchResponse();
  }, []);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;

      wrapper.innerHTML = "";
      const editer = document.createElement("div");

      wrapper.append(editer);
      const quillInstance = new Quill(editer, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      quillInstance.clipboard.dangerouslyPasteHTML(data);
      setEditor(quillInstance);
    },
    [data]
  );

  const handleDownloadDocx = async () => {
    if (!editor) return;
    const editorContent = editor.getText();

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph(editorContent)],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "proposal.docx");
  };

  return (
    <div>
      <div className="container" ref={wrapperRef}></div>
      {/* <button
        className="btn btn-primary submit-btn"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        onClick={handleDownloadDocx}
      >
        Download Proposal as DOCX
      </button> */}
    </div>
  );
}

export default Editer;
