import React, { useState, useRef, useEffect, useContext } from "react";
import { Mail, X, Send, User, Plus } from "lucide-react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import AuthContext from "../../../store/auth-context";
import { useNavigate } from "react-router-dom";

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
    }, 2000);
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
      {/* 플로팅 버튼 */}

      <button
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
        onClick={handleOpenModal}
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* 모달 */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-4xl h-[80vh] flex flex-col animate-slideUp shadow-2xl">
            {/* 모달 헤더 */}

            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                  새 메시지 작성
                </h2>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col space-y-4 overflow-hidden">
              {!showEditor ? (
                // 애니메이션이 있는 봉투 디자인

                <div className="flex-1 flex items-center justify-center">
                  <div className="envelope-animation">
                    <div className="envelope">
                      <div className="envelope-back" />

                      <div className="letter">
                        <div className="letter-content">
                          <div className="letter-title">새로운 칭찬 카드</div>

                          <div className="letter-text">
                            동료에게 따뜻한 마음을 전해보세요
                          </div>
                        </div>
                      </div>

                      <div className="envelope-front" />

                      <div className="envelope-top" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* 제목 입력 */}

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="제목을 입력하세요"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* 받는 사람 입력 */}

                  <div className="relative" ref={dropdownRef}>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="받는 사람 이메일"
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={recipient}
                        onChange={handleRecipientChange}
                        required
                      />

                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>

                    {/* 자동완성 드롭다운 */}

                    {showDropdown && filteredUsers.length > 0 && (
                      <div className="absolute z-[60] w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto animate-slideDown">
                        {filteredUsers.map((email, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center space-x-2"
                            onClick={() => handleSelectUser(email)}
                          >
                            <User className="w-4 h-4 text-gray-400" />

                            <span>{email}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 에디터 */}

                  <div
                    className="flex-1 border rounded-lg overflow-hidden"
                    style={{ zIndex: 10 }}
                  >
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

                  {/* 전송 버튼 */}

                  <button
                    onClick={handleSubmit}
                    className={`

                    w-full px-4 py-3 rounded-lg flex items-center justify-center space-x-2

                    ${
                      !recipient || !title
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    }

                  `}
                    disabled={!recipient || !title}
                  >
                    <Send className="w-5 h-5" />

                    <span>보내기</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* 애니메이션 키프레임 정의 */

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }

          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }

          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* 봉투 애니메이션 스타일 */

        .envelope-animation {
          position: relative;

          width: 300px;

          height: 200px;

          perspective: 1000px;

          transform-style: preserve-3d;

          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-20px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        .envelope {
          position: relative;

          width: 100%;

          height: 100%;

          background-color: #f8fafc;

          border-radius: 10px;

          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

          transform-style: preserve-3d;

          transition: transform 0.5s;
        }

        .envelope:hover {
          transform: rotateX(20deg);
        }

        .letter {
          position: absolute;

          top: 50%;

          left: 50%;

          transform: translate(-50%, -50%);

          width: 80%;

          height: 80%;

          background-color: white;

          padding: 20px;

          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

          border-radius: 8px;

          text-align: center;

          display: flex;

          flex-direction: column;

          justify-content: center;

          animation: letterFloat 2s ease-in-out infinite;
        }

        @keyframes letterFloat {
          0%,
          100% {
            transform: translate(-50%, -50%);
          }

          50% {
            transform: translate(-50%, -60%);
          }
        }

        .letter-title {
          font-size: 1.5rem;

          font-weight: bold;

          color: #4f46e5;

          margin-bottom: 0.5rem;
        }

        .letter-text {
          color: #6b7280;

          font-size: 1rem;
        }

        /* 애니메이션 클래스 */

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatingButton;
