import React, { useState, useRef, useEffect, useContext } from "react";
import { Mail } from "lucide-react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import AuthContext from "../../../store/auth-context";
import { useNavigate } from "react-router-dom";
import "./FloatingButton.css";

const FloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const editorRef = useRef();
  const dropdownRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setShowEditor(true);
    }, 3000);
  };

  const handleCloseModal = () => {
    setShowEditor(false);
    setIsModalOpen(false);
  };

  const getFilteredUsers = (searchText) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users
      .filter((user) =>
        user.email.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((user) => user.email);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRecipientChange = (e) => {
    const value = e.target.value;
    setRecipient(value);
    setFilteredUsers(getFilteredUsers(value));
    setShowDropdown(true);
  };

  const handleSelectUser = (email) => {
    setRecipient(email);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();

    // 새 메시지 객체 생성
    const newMessage = {
      id: Date.now(), // 고유 ID로 타임스탬프 사용
      from: authCtx.email, // 현재 로그인한 사용자의 이메일
      to: recipient,
      title: title,
      content: content,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    // 발신 메시지 저장
    const sentMessages = JSON.parse(
      localStorage.getItem(`sentMessages_${authCtx.email}`) || "[]"
    );
    sentMessages.push(newMessage);
    localStorage.setItem(
      `sentMessages_${authCtx.email}`,
      JSON.stringify(sentMessages)
    );

    // 수신자의 받은 메시지함에 저장
    const receivedMessages = JSON.parse(
      localStorage.getItem(`receivedMessages_${recipient}`) || "[]"
    );
    receivedMessages.push(newMessage);
    localStorage.setItem(
      `receivedMessages_${recipient}`,
      JSON.stringify(receivedMessages)
    );

    // 모달 초기화 및 닫기
    setTitle("");
    setRecipient("");
    editorInstance.setMarkdown("");
    setIsModalOpen(false);

    // 성공 메시지 표시
    alert("메시지가 성공적으로 전송되었습니다!");

    navigate("/outbox");
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500"
        onClick={handleOpenModal}
      >
        <Mail className="w-6 h-6" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">새 메시지</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col space-y-4 overflow-hidden">
              {!showEditor ? (
                <div className="envelope">
                  <div className="envelope-body" />

                  <div className="letter">
                    <span className="letter-text">Ace Card</span>
                  </div>

                  <div className="envelope-flap" />
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="제목"
                    className="w-full p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <div className="relative" ref={dropdownRef}>
                    <input
                      type="email"
                      placeholder="받는 사람"
                      className="w-full p-2 border rounded"
                      value={recipient}
                      onChange={handleRecipientChange}
                      required
                    />
                    {showDropdown && filteredUsers.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {filteredUsers.map((email, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectUser(email)}
                          >
                            {email}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 disabled:bg-gray-400"
                    disabled={!recipient || !title}
                  >
                    보내기
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButton;
