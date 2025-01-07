import React, { useState, useRef } from "react";
import { Mail } from "lucide-react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const FloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const editorRef = useRef();

  const handleSubmit = () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();
    console.log({
      title: title,
      content: content,
    });
    // 여기서 content를 서버로 전송하거나 원하는 처리를 하면 됩니다
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500"
        onClick={() => setIsModalOpen(true)}
      >
        <Mail className="w-6 h-6" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            {/* 모달 헤더 */}

            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">새 메시지</h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            {/* 모달 내용 */}

            <div className="p-4 flex-1 flex flex-col space-y-4 overflow-hidden">
              <input
                type="text"
                placeholder="제목"
                className="w-full p-2 border rounded"
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="flex-1">
                <Editor
                  ref={editorRef}
                  initialValue="내용을 입력하세요"
                  previewStyle="vertical"
                  height="100%"
                  initialEditType="wysiwyg"
                  useCommandShortcut={true}
                  language="ko-KR"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
              >
                보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButton;
